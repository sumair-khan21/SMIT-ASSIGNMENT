// ═══════════════════════════════════════════════════════════
//                        USER MODEL
//          (Base model for Admin, Employer, Seeker)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const config = require('../config/config');
const { USER_ROLES_ARRAY, VALIDATION } = require('../utils/constants');

// ─────────────────────────────────────────────────────────────
// User Schema Definition
// ─────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                    BASIC INFORMATION
    // ═════════════════════════════════════════════════════════
    
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [VALIDATION.NAME_MIN_LENGTH, `First name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`],
        maxlength: [VALIDATION.NAME_MAX_LENGTH, `First name cannot exceed ${VALIDATION.NAME_MAX_LENGTH} characters`],
        validate: {
            validator: function(value) {
                // No HTML tags allowed (XSS prevention)
                return !/<[^>]*>/g.test(value);
            },
            message: 'First name cannot contain HTML tags'
        }
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [VALIDATION.NAME_MIN_LENGTH, `Last name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`],
        maxlength: [VALIDATION.NAME_MAX_LENGTH, `Last name cannot exceed ${VALIDATION.NAME_MAX_LENGTH} characters`],
        validate: {
            validator: function(value) {
                return !/<[^>]*>/g.test(value);
            },
            message: 'Last name cannot contain HTML tags'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                    EMAIL (Unique)
    // ═════════════════════════════════════════════════════════
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'Please provide a valid email address'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                  PASSWORD (Hashed & Secured)
    // ═════════════════════════════════════════════════════════
    
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`],
        select: false,  // Never return password in queries
        validate: {
            validator: function(value) {
                // Strong password validation
                return validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                    PHONE (Optional)
    // ═════════════════════════════════════════════════════════
    
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                if (!value) return true; // Optional field
                // Pakistani phone number format: 03XX-XXXXXXX
                return /^(\+92|0)?3[0-9]{9}$/.test(value.replace(/[-\s]/g, ''));
            },
            message: 'Please provide a valid phone number (e.g., 03001234567)'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                  ROLE (Admin, Employer, Seeker)
    // ═════════════════════════════════════════════════════════
    
    role: {
        type: String,
        required: [true, 'User role is required'],
        enum: {
            values: USER_ROLES_ARRAY,
            message: '{VALUE} is not a valid role'
        },
        default: 'seeker'
    },

    // ═════════════════════════════════════════════════════════
    //                    PROFILE PICTURE
    // ═════════════════════════════════════════════════════════
    
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
        validate: {
            validator: function(value) {
                if (!value) return true;
                return validator.isURL(value, {
                    protocols: ['http', 'https'],
                    require_protocol: true
                });
            },
            message: 'Please provide a valid URL for avatar'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                    ACCOUNT STATUS
    // ═════════════════════════════════════════════════════════
    
    isActive: {
        type: Boolean,
        default: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    // ═════════════════════════════════════════════════════════
    //                    SECURITY FIELDS
    // ═════════════════════════════════════════════════════════
    
    emailVerificationToken: {
        type: String,
        select: false
    },

    emailVerificationExpires: {
        type: Date,
        select: false
    },

    passwordResetToken: {
        type: String,
        select: false
    },

    passwordResetExpires: {
        type: Date,
        select: false
    },

    passwordChangedAt: {
        type: Date,
        select: false
    },

    // ═════════════════════════════════════════════════════════
    //                  LOGIN TRACKING
    // ═════════════════════════════════════════════════════════
    
    lastLogin: {
        type: Date
    },

    loginAttempts: {
        type: Number,
        default: 0,
        select: false
    },

    lockUntil: {
        type: Date,
        select: false
    }

}, {
    // ═════════════════════════════════════════════════════════
    //                    SCHEMA OPTIONS
    // ═════════════════════════════════════════════════════════
    
    timestamps: true,  // createdAt, updatedAt
    
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            // Remove sensitive fields from response
            delete ret.password;
            delete ret.passwordResetToken;
            delete ret.passwordResetExpires;
            delete ret.emailVerificationToken;
            delete ret.emailVerificationExpires;
            delete ret.__v;
            return ret;
        }
    },
    
    toObject: {
        virtuals: true
    }
});

// ═══════════════════════════════════════════════════════════
//                          INDEXES
// ═══════════════════════════════════════════════════════════

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1, isBlocked: 1 });
userSchema.index({ firstName: 'text', lastName: 'text' });

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Check if account is locked
userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// ═══════════════════════════════════════════════════════════
//                    PRE MIDDLEWARE (HOOKS)
// ═══════════════════════════════════════════════════════════

// Hash password before saving
userSchema.pre('save', async function(next) {
    try {
        // Only hash if password is modified
        if (!this.isModified('password')) {
            return next();
        }

        // Hash password
        const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        
        // Set passwordChangedAt
        if (!this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

// ═══════════════════════════════════════════════════════════
//                      INSTANCE METHODS
// ═══════════════════════════════════════════════════════════

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role
    };

    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpire
    });
};

// Check if password was changed after token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// Increment login attempts
userSchema.methods.incLoginAttempts = function() {
    // If previous lock has expired, restart count
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }

    // Otherwise increment attempts
    const updates = { $inc: { loginAttempts: 1 } };

    // Lock account after 5 failed attempts (30 minutes)
    const maxAttempts = 5;
    if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 30 * 60 * 1000 };
    }

    return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
    });
};

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Find by email
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Find by credentials (for login)
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email: email.toLowerCase() })
        .select('+password +loginAttempts +lockUntil');
    
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Check if account is locked
    if (user.isLocked) {
        throw new Error('Account is temporarily locked. Please try again later.');
    }

    // Check if account is blocked
    if (user.isBlocked) {
        throw new Error('Your account has been blocked. Please contact support.');
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    
    if (!isPasswordMatch) {
        // Increment login attempts
        await user.incLoginAttempts();
        throw new Error('Invalid email or password');
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    return user;
};

// Get active users
userSchema.statics.getActiveUsers = function(role = null) {
    const query = { isActive: true, isBlocked: false };
    if (role) query.role = role;
    return this.find(query);
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const User = mongoose.model('User', userSchema);

module.exports = User;