// ═══════════════════════════════════════════════════════════
//                   GLOBAL ERROR HANDLER
//          (Sabhi errors ko handle karne ke liye)
// ═══════════════════════════════════════════════════════════

const ApiError = require('../utils/ApiError');
const config = require('../config/config');

// ─────────────────────────────────────────────────────────────
// Error Handler Middleware
// ─────────────────────────────────────────────────────────────
const errorHandler = (err, req, res, next) => {
    
    let error = err;

    // ─────────────────────────────────────────────────────────
    // Development mein full error log karo
    // ─────────────────────────────────────────────────────────
    if (config.nodeEnv === 'development') {
        console.error('❌ Error Details:');
        console.error('Name:', err.name);
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);
    }

    // ─────────────────────────────────────────────────────────
    // Agar ApiError nahi hai, toh convert karo
    // ─────────────────────────────────────────────────────────
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, [], error.stack);
    }

    // ─────────────────────────────────────────────────────────
    // MONGOOSE VALIDATION ERROR
    // Example: Required field missing
    // ─────────────────────────────────────────────────────────
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
        
        error = ApiError.validationError(errors);
    }

    // ─────────────────────────────────────────────────────────
    // MONGOOSE DUPLICATE KEY ERROR (11000)
    // Example: Email already exists
    // ─────────────────────────────────────────────────────────
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        const message = `${field} '${value}' already exists`;
        
        error = ApiError.conflict(message);
    }

    // ─────────────────────────────────────────────────────────
    // MONGOOSE CAST ERROR
    // Example: Invalid ObjectId format
    // ─────────────────────────────────────────────────────────
    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}: ${err.value}`;
        error = ApiError.badRequest(message);
    }

    // ─────────────────────────────────────────────────────────
    // JWT ERRORS
    // ─────────────────────────────────────────────────────────
    
    // Invalid token
    if (err.name === 'JsonWebTokenError') {
        error = ApiError.unauthorized('Invalid token - Please login again');
    }

    // Token expired
    if (err.name === 'TokenExpiredError') {
        error = ApiError.unauthorized('Token expired - Please login again');
    }

    // ─────────────────────────────────────────────────────────
    // Send Error Response
    // ─────────────────────────────────────────────────────────
    const response = {
        success: false,
        message: error.message,
        errors: error.errors || []
    };

    // Development mein stack trace bhi bhejo
    if (config.nodeEnv === 'development') {
        response.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
};

// ─────────────────────────────────────────────────────────────
// Export middleware
// ─────────────────────────────────────────────────────────────
module.exports = errorHandler;