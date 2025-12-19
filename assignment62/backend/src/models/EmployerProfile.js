// ═══════════════════════════════════════════════════════════
//                  EMPLOYER PROFILE MODEL
//              (Company/Employer ka profile)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const validator = require('validator');
const { 
    VALIDATION, 
    COMPANY_SIZES_ARRAY, 
    INDUSTRIES 
} = require('../utils/constants');

// ─────────────────────────────────────────────────────────────
// Employer Profile Schema
// ─────────────────────────────────────────────────────────────
const employerProfileSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                  REFERENCE TO USER
    // ═════════════════════════════════════════════════════════
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    // ═════════════════════════════════════════════════════════
    //                  COMPANY INFORMATION
    // ═════════════════════════════════════════════════════════
    
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        minlength: [2, 'Company name must be at least 2 characters'],
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },

    companyLogo: {
        type: String,
        validate: {
            validator: function(value) {
                if (!value) return true;
                return validator.isURL(value, {
                    protocols: ['http', 'https'],
                    require_protocol: true
                });
            },
            message: 'Please provide a valid URL for company logo'
        }
    },

    companyWebsite: {
        type: String,
        validate: {
            validator: function(value) {
                if (!value) return true;
                return validator.isURL(value, {
                    protocols: ['http', 'https'],
                    require_protocol: true
                });
            },
            message: 'Please provide a valid URL for company website'
        }
    },

    // ═════════════════════════════════════════════════════════
    //                  COMPANY DETAILS
    // ═════════════════════════════════════════════════════════
    
    industry: {
        type: String,
        enum: {
            values: INDUSTRIES,
            message: '{VALUE} is not a valid industry'
        }
    },

    companySize: {
        type: String,
        enum: {
            values: COMPANY_SIZES_ARRAY,
            message: '{VALUE} is not a valid company size'
        }
    },

    foundedYear: {
        type: Number,
        min: [1800, 'Founded year seems invalid'],
        max: [new Date().getFullYear(), 'Founded year cannot be in future']
    },

    description: {
        type: String,
        trim: true,
        maxlength: [VALIDATION.DESCRIPTION_MAX_LENGTH, `Description cannot exceed ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`]
    },

    // ═════════════════════════════════════════════════════════
    //                      LOCATION
    // ═════════════════════════════════════════════════════════
    
    headquarters: {
        city: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true,
            default: 'Pakistan'
        },
        address: {
            type: String,
            trim: true
        }
    },

    // ═════════════════════════════════════════════════════════
    //                   VERIFICATION
    // ═════════════════════════════════════════════════════════
    
    isVerified: {
        type: Boolean,
        default: false
        // Admin will verify companies
    },

    verifiedAt: {
        type: Date
    },

    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // Admin user who verified
    },

    // ═════════════════════════════════════════════════════════
    //                   SOCIAL LINKS
    // ═════════════════════════════════════════════════════════
    
    socialLinks: {
        linkedin: {
            type: String,
            validate: {
                validator: function(value) {
                    if (!value) return true;
                    return validator.isURL(value);
                },
                message: 'Please provide a valid LinkedIn URL'
            }
        },
        twitter: {
            type: String,
            validate: {
                validator: function(value) {
                    if (!value) return true;
                    return validator.isURL(value);
                },
                message: 'Please provide a valid Twitter URL'
            }
        },
        facebook: {
            type: String,
            validate: {
                validator: function(value) {
                    if (!value) return true;
                    return validator.isURL(value);
                },
                message: 'Please provide a valid Facebook URL'
            }
        }
    },

    // ═════════════════════════════════════════════════════════
    //                   PROFILE COMPLETION
    // ═════════════════════════════════════════════════════════
    
    profileCompleteness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }

}, {
    // ═════════════════════════════════════════════════════════
    //                   SCHEMA OPTIONS
    // ═════════════════════════════════════════════════════════
    
    timestamps: true,
    
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
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

employerProfileSchema.index({ userId: 1 }, { unique: true });
employerProfileSchema.index({ companyName: 1 });
employerProfileSchema.index({ 'headquarters.city': 1 });
employerProfileSchema.index({ industry: 1 });
employerProfileSchema.index({ isVerified: 1 });
employerProfileSchema.index({ companyName: 'text', description: 'text' });

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Company age
employerProfileSchema.virtual('companyAge').get(function() {
    if (this.foundedYear) {
        return new Date().getFullYear() - this.foundedYear;
    }
    return null;
});

// ═══════════════════════════════════════════════════════════
//                    PRE MIDDLEWARE (HOOKS)
// ═══════════════════════════════════════════════════════════

// Calculate profile completeness before saving
employerProfileSchema.pre('save', function(next) {
    let completeness = 0;
    const weights = {
        companyName: 15,
        companyLogo: 10,
        companyWebsite: 10,
        industry: 10,
        companySize: 10,
        foundedYear: 5,
        description: 20,
        headquarters: 10,
        socialLinks: 10
    };
    
    if (this.companyName) completeness += weights.companyName;
    if (this.companyLogo) completeness += weights.companyLogo;
    if (this.companyWebsite) completeness += weights.companyWebsite;
    if (this.industry) completeness += weights.industry;
    if (this.companySize) completeness += weights.companySize;
    if (this.foundedYear) completeness += weights.foundedYear;
    if (this.description) completeness += weights.description;
    if (this.headquarters && this.headquarters.city) completeness += weights.headquarters;
    
    // Check if any social link exists
    if (this.socialLinks && (this.socialLinks.linkedin || this.socialLinks.twitter || this.socialLinks.facebook)) {
        completeness += weights.socialLinks;
    }
    
    this.profileCompleteness = completeness;
    next();
});

// ═══════════════════════════════════════════════════════════
//                      INSTANCE METHODS
// ═══════════════════════════════════════════════════════════

// Verify company (Admin only)
employerProfileSchema.methods.verifyCompany = function(adminId) {
    this.isVerified = true;
    this.verifiedAt = new Date();
    this.verifiedBy = adminId;
    return this.save();
};

// Unverify company
employerProfileSchema.methods.unverifyCompany = function() {
    this.isVerified = false;
    this.verifiedAt = null;
    this.verifiedBy = null;
    return this.save();
};

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Find by user ID
employerProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId }).populate('userId', 'firstName lastName email avatar');
};

// Find verified companies
employerProfileSchema.statics.findVerified = function() {
    return this.find({ isVerified: true })
        .populate('userId', 'firstName lastName email');
};

// Search by industry
employerProfileSchema.statics.searchByIndustry = function(industry) {
    return this.find({ industry })
        .populate('userId', 'firstName lastName email');
};

// Find by location
employerProfileSchema.statics.findByLocation = function(city) {
    return this.find({ 'headquarters.city': city })
        .populate('userId', 'firstName lastName email');
};

// Get pending verifications (for admin)
employerProfileSchema.statics.getPendingVerifications = function() {
    return this.find({ isVerified: false })
        .populate('userId', 'firstName lastName email createdAt');
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const EmployerProfile = mongoose.model('EmployerProfile', employerProfileSchema);

module.exports = EmployerProfile;