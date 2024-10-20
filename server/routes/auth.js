import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = express.Router();

// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, role, companyName } = req.body;
//     const user = new User({ name, email, password, role, companyName });
//     await user.save();
    
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET );
//     res.status(201).json({ token, role: user.role });
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating user' });
//   }
// });


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, companyName, businessRegistration, adminCode } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Validate role-specific fields
    if (role === 'owner' && (!companyName || !businessRegistration)) {
      return res.status(400).json({ message: 'Company name and business registration are required for owners' });
    }

    if (role === 'admin') {
      // Check admin code (you should store this securely, not hardcoded)
      const validAdminCode = process.env.ADMIN_SIGNUP_CODE;
      if (adminCode !== validAdminCode) {
        return res.status(403).json({ message: 'Invalid admin code' });
      }
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      companyName: role === 'owner' ? companyName : undefined,
      businessRegistration: role === 'owner' ? businessRegistration : undefined,
    });

    await user.save();
    
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     if (user.role === 'owner' && !user.isApproved) {
//       return res.status(403).json({ message: 'Your account is pending approval' });
//     }
    
//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET );
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(400).json({ message: 'Error logging in' });
//   }
// });


router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (user.role === 'owner' && !user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending approval' });
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET );
    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;