import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Automatically delete tokens after 24 hours
  }
});

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(v);
      },
      message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
    }
  },
  role: { 
    type: String, 
    enum: ['student', 'owner', 'admin'], 
    default: 'student' 
  },
  companyName: { 
    type: String, 
    required: function() { return this.role === 'owner'; },
    trim: true
  },
  businessRegistration: { 
    type: String, 
    required: function() { return this.role === 'owner'; },
    trim: true
  },
  isApproved: { 
    type: Boolean, 
    default: function() { return this.role !== 'owner'; } 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  tokens: [tokenSchema],
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'tokens.token': 1 });

// Remove sensitive information from JSON responses
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user.failedLoginAttempts;
  delete user.lockUntil;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  
  if (user.isModified('password')) {
    try {
      user.password = await bcrypt.hash(user.password, 12);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Handle failed login attempts
userSchema.methods.handleFailedLogin = async function() {
  this.failedLoginAttempts += 1;
  
  if (this.failedLoginAttempts >= 5) {
    // Lock account for 15 minutes after 5 failed attempts
    this.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
  }
  
  await this.save();
};

// Reset failed login attempts
userSchema.methods.resetFailedAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = new Date();
  await this.save();
};

// Check if account is locked
userSchema.methods.isLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};

const User = mongoose.model('User', userSchema);

export default User;