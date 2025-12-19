// ═══════════════════════════════════════════════════════════
//                   AUTH VALIDATORS
//              (API Level Validation - Layer 2)
// ═══════════════════════════════════════════════════════════

const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// ─────────────────────────────────────────────────────────────
// Validation Error Formatter
// ─────────────────────────────────────────────────────────────
const formatValidationErrors = (errors) => {
    return errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
    }));
};

// ─────────────────────────────────────────────────────────────
// Check Validation Results Middleware
// ─────────────────────────────────────────────────────────────
const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: formatValidationErrors(errors)
        });
    }
    
    next();
};

// ═══════════════════════════════════════════════════════════
//                   REGISTER VALIDATION
// ═══════════════════════════════════════════════════════════

const registerValidation = [
    // First Name
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2-50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('First name can only contain letters')
        .customSanitizer(value => value.replace(/<[^>]*>/g, '')), // Remove HTML tags

    // Last Name
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2-50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Last name can only contain letters')
        .customSanitizer(value => value.replace(/<[^>]*>/g, '')),

    // Email
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail()
        .custom(async (email) => {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                throw new Error('Email already registered');
            }
            return true;
        }),

    // Password
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
        .withMessage('Password must contain: uppercase, lowercase, number, and special character'),

    // Confirm Password
    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    // Role
    body('role')
        .optional()
        .isIn(['seeker', 'employer']).withMessage('Role must be either seeker or employer'),

    // Phone (Optional)
    body('phone')
        .optional()
        .matches(/^(\+92|0)?3[0-9]{9}$/).withMessage('Please provide a valid Pakistani phone number'),

    validate
];

// ═══════════════════════════════════════════════════════════
//                     LOGIN VALIDATION
// ═══════════════════════════════════════════════════════════

const loginValidation = [
    // Email
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    // Password
    body('password')
        .notEmpty().withMessage('Password is required'),

    validate
];

// ═══════════════════════════════════════════════════════════
//                 UPDATE PROFILE VALIDATION
// ═══════════════════════════════════════════════════════════

const updateProfileValidation = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2-50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('First name can only contain letters'),

    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2-50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Last name can only contain letters'),

    body('phone')
        .optional()
        .matches(/^(\+92|0)?3[0-9]{9}$/).withMessage('Please provide a valid Pakistani phone number'),

    validate
];

// ═══════════════════════════════════════════════════════════
//                 CHANGE PASSWORD VALIDATION
// ═══════════════════════════════════════════════════════════

const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),

    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
        .withMessage('Password must contain: uppercase, lowercase, number, and special character')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('New password must be different from current password');
            }
            return true;
        }),

    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your new password')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    validate
];

// ═══════════════════════════════════════════════════════════
//                 FORGOT PASSWORD VALIDATION
// ═══════════════════════════════════════════════════════════

const forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    validate
];

// ═══════════════════════════════════════════════════════════
//                 RESET PASSWORD VALIDATION
// ═══════════════════════════════════════════════════════════

const resetPasswordValidation = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
        .withMessage('Password must contain: uppercase, lowercase, number, and special character'),

    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    validate
];

// ═══════════════════════════════════════════════════════════
//                     EXPORT ALL
// ═══════════════════════════════════════════════════════════

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};