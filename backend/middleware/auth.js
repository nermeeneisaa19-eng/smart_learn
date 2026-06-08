const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Student not found.'
      });
    }

    if (!student.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated.'
      });
    }

    req.student = student;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.student.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
};

// Middleware to check if user is instructor or admin
const requireInstructor = (req, res, next) => {
  if (!['instructor', 'admin'].includes(req.student.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Instructor role required.'
    });
  }
  next();
};

// Middleware to check if user owns the resource or is admin
const requireOwnership = (resourceField = 'studentId') => {
  return (req, res, next) => {
    if (req.student.role === 'admin') {
      return next();
    }

    const resourceId = req.params.id || req.body[resourceField];
    if (req.student._id.toString() !== resourceId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }
    next();
  };
};

// Middleware for optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(decoded.id);
      if (student && student.isActive) {
        req.student = student;
        req.token = token;
      }
    }
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Middleware to refresh token
const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required.'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student || !student.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token.'
      });
    }

    // Generate new access token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    req.newToken = token;
    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Rate limiting for AI endpoints
const aiRateLimit = require('express-rate-limit')({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute for AI endpoints
  message: {
    success: false,
    message: 'Too many AI requests. Please wait a moment.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload rate limiting
const uploadRateLimit = require('express-rate-limit')({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 uploads per minute
  message: {
    success: false,
    message: 'Too many file uploads. Please wait a moment.'
  },
});

module.exports = {
  authenticate,
  requireAdmin,
  requireInstructor,
  requireOwnership,
  optionalAuth,
  refreshToken,
  aiRateLimit,
  uploadRateLimit
};