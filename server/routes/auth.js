import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import User from '../models/user.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Stricter rate limiting
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per window
  message: { message: 'Too many login attempts, please try again later' }
});

const signupLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 signup attempts per hour
  message: { message: 'Too many signup attempts, please try again later' }
});

// Enhanced validation middleware
const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email is already registered');
      }
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
  body('role').isIn(['student', 'owner', 'admin']),
  body('companyName').if(body('role').equals('owner'))
    .notEmpty()
    .withMessage('Company name is required for owners')
    .trim(),
  body('businessRegistration').if(body('role').equals('owner'))
    .notEmpty()
    .withMessage('Business registration is required for owners')
    .trim(),
  body('adminCode').if(body('role').equals('admin'))
    .notEmpty()
    .withMessage('Admin code is required')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body('role')
    .isIn(['student', 'owner', 'admin'])
    .withMessage('Invalid role specified')
];

const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      role: user.role,
      email: user.email 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '24h',  // Increased token expiry
      algorithm: 'HS512' // More secure algorithm
    }
  );
};

router.post('/signup', signupLimiter, validateSignup, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { name, email, password, role, companyName, businessRegistration, adminCode } = req.body;

    // Admin validation
    if (role === 'admin') {
      const validAdminCode = process.env.ADMIN_SIGNUP_CODE;
      if (adminCode !== validAdminCode) {
        return res.status(403).json({ 
          success: false,
          message: 'Invalid admin code' 
        });
      }
    }

    // Hash password with higher cost factor
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'owner' ? companyName : undefined,
      businessRegistration: role === 'owner' ? businessRegistration : undefined,
    });

    await user.save();
    
    const token = generateToken(user);

    // Store token in user document
    user.tokens = user.tokens || [];
    user.tokens.push({ token });
    await user.save();

    res.status(201).json({ 
      success: true,
      token, 
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/login', loginLimiter, validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password, role } = req.body;
    
    // Find user without role check first
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Separate role check for better security
    if (user.role !== role) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    if (user.role === 'owner' && !user.isApproved) {
      return res.status(403).json({ 
        success: false,
        message: 'Your account is pending approval' 
      });
    }

    // Generate new token
    const token = generateToken(user);

    // Store token in user document
    user.tokens = user.tokens || [];
    user.tokens.push({ token });
    await user.save();

    res.json({ 
      success: true,
      token, 
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Add logout endpoint
router.post('/logout', auth, async (req, res) => {
  try {
    // Remove the current token
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    
    res.json({ 
      success: true,
      message: 'Logged out successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error during logout' 
    });
  }
});

// Add logout from all devices endpoint
router.post('/logout-all', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    
    res.json({ 
      success: true,
      message: 'Logged out from all devices successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error during logout' 
    });
  }
});

export default router;