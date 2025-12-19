// ═══════════════════════════════════════════════════════════
//                   AUTH MIDDLEWARE
//              (JWT Token Verification)
// ═══════════════════════════════════════════════════════════

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

// ═══════════════════════════════════════════════════════════
//                   PROTECT ROUTES
//              (Login required middleware)
// ═══════════════════════════════════════════════════════════

const protect = async (req, res, next) => {
    try {
        let token;

        // ─────────────────────────────────────────────────────
        // Get token from header or cookie
        // ─────────────────────────────────────────────────────
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Get from Authorization header
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            // Get from cookie
            token = req.cookies.token;
        }

        // Check if token exists
        if (!token) {
            throw ApiError.unauthorized('Please login to access this resource');
        }

        // ─────────────────────────────────────────────────────
        // Verify token
        // ─────────────────────────────────────────────────────
        
        const decoded = jwt.verify(token, config.jwtSecret);

        // ─────────────────────────────────────────────────────
        // Get user from database
        // ─────────────────────────────────────────────────────
        
        const user = await User.findById(decoded.id);

        if (!user) {
            throw ApiError.unauthorized('User not found - Please login again');
        }

        // ─────────────────────────────────────────────────────
        // Check if user is active
        // ─────────────────────────────────────────────────────
        
        if (!user.isActive) {
            throw ApiError.forbidden('Your account has been deactivated');
        }

        if (user.isBlocked) {
            throw ApiError.forbidden('Your account has been blocked - Contact support');
        }

        // ─────────────────────────────────────────────────────
        // Check if password changed after token was issued
        // ─────────────────────────────────────────────────────
        
        if (user.changedPasswordAfter(decoded.iat)) {
            throw ApiError.unauthorized('Password recently changed - Please login again');
        }

        // ─────────────────────────────────────────────────────
        // Attach user to request
        // ─────────────────────────────────────────────────────
        
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};

// ═══════════════════════════════════════════════════════════
//                   ROLE BASED ACCESS
//              (Admin, Employer, Seeker check)
// ═══════════════════════════════════════════════════════════

const restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if user role is allowed
        if (!roles.includes(req.user.role)) {
            return next(
                ApiError.forbidden(`Role '${req.user.role}' is not allowed to access this resource`)
            );
        }
        next();
    };
};

// ═══════════════════════════════════════════════════════════
//                   OPTIONAL AUTH
//          (Get user if logged in, but don't require)
// ═══════════════════════════════════════════════════════════

const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (token) {
            const decoded = jwt.verify(token, config.jwtSecret);
            const user = await User.findById(decoded.id);
            
            if (user && user.isActive && !user.isBlocked) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // Don't throw error, just continue without user
        next();
    }
};

// ═══════════════════════════════════════════════════════════
//                     EXPORT ALL
// ═══════════════════════════════════════════════════════════

module.exports = {
    protect,
    restrictTo,
    optionalAuth
};