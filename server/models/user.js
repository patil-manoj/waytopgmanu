import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'owner', 'admin'], default: 'student' },
  companyName: { type: String, required: function() { return this.role === 'owner'; } },
  businessRegistration: { type: String, required: function() { return this.role === 'owner'; } },
  isApproved: { type: Boolean, default: function() { return this.role !== 'owner'; } },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default mongoose.model('User', userSchema);