import pkg from 'express';
const { Request, Response, NextFunction } = pkg;
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const auth = async (req, res, next) => {
  try {
    // Check for token in different places
    const token = 
      req.header('Authorization')?.replace('Bearer ', '') || 
      req.cookies?.token ||
      req.query?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check token expiration
      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      }

      const user = await User.findOne({ 
        _id: decoded.userId,
        'tokens.token': token // Verify token is still valid in DB
      }).select('-password'); // Exclude password from the result

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found or token invalidated'
        });
      }

      // Add user and token to request
      req.user = user;
      req.token = token;
      next();
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
      throw error;
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }
    
    next();
  };
};