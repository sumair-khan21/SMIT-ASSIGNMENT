// ═══════════════════════════════════════════════════════════
//                   SEEKER PROFILE MODEL
//              (Job seeker ka detailed profile)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const validator = require('validator');
const { 
    VALIDATION, 
    JOB_TYPES_ARRAY, 
    CURRENCIES,
    WORK_MODES_ARRAY 
} = require('../utils/constants');

// ─────────────────────────────────────────────────────────────
// Seeker Profile Schema
// ─────────────────────────────────────────────────────────────
const seekerProfileSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                  REFERENCE TO USER
    // ═════════════════════════════════════════════════════════
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        // unique: true  // Ek user ki ek hi profile
    },

    // ═════════════════════════════════════════════════════════
    //                  PROFESSIONAL INFO
    // ═════════════════════════════════════════════════════════
    
    title: {
        type: String,
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
        // Example: "Full Stack Developer", "Senior React Developer"
    },

    bio: {
        type: String,
        trim: true,
        maxlength: [VALIDATION.BIO_MAX_LENGTH, `Bio cannot exceed ${VALIDATION.BIO_MAX_LENGTH} characters`],
        // About me / Professional summary
    },

    // ═════════════════════════════════════════════════════════
    //                      SKILLS
    // ═════════════════════════════════════════════════════════
    
    skills: {
        type: [String],
        validate: {
            validator: function(value) {
                return value.length <= VALIDATION.SKILLS_MAX_COUNT;
            },
            message: `Cannot add more than ${VALIDATION.SKILLS_MAX_COUNT} skills`
        }
        // Example: ["JavaScript", "React", "Node.js", "MongoDB"]
    },

    // ═════════════════════════════════════════════════════════
    //                      EXPERIENCE
    // ═════════════════════════════════════════════════════════
    
    experience: [{
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        position: {
            type: String,
            required: [true, 'Position is required'],
            trim: true
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required']
        },
        endDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    // End date should be after start date
                    if (value && this.startDate) {
                        return value >= this.startDate;
                    }
                    return true;
                },
                message: 'End date must be after start date'
            }
        },
        isCurrent: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        }
    }],

    // ═════════════════════════════════════════════════════════
    //                      EDUCATION
    // ═════════════════════════════════════════════════════════
    
    education: [{
        institution: {
            type: String,
            required: [true, 'Institution name is required'],
            trim: true
        },
        degree: {
            type: String,
            required: [true, 'Degree is required'],
            trim: true
            // Example: "Bachelor's", "Master's", "PhD"
        },
        field: {
            type: String,
            required: [true, 'Field of study is required'],
            trim: true
            // Example: "Computer Science", "Business Administration"
        },
        startYear: {
            type: Number,
            required: [true, 'Start year is required'],
            min: [1950, 'Start year must be after 1950'],
            max: [new Date().getFullYear(), 'Start year cannot be in future']
        },
        endYear: {
            type: Number,
            min: [1950, 'End year must be after 1950'],
            max: [new Date().getFullYear() + 10, 'End year seems invalid'],
            validate: {
                validator: function(value) {
                    if (value && this.startYear) {
                        return value >= this.startYear;
                    }
                    return true;
                },
                message: 'End year must be after start year'
            }
        }
    }],

    // ═════════════════════════════════════════════════════════
    //                      RESUME
    // ═════════════════════════════════════════════════════════
    
    resume: {
        type: String,
        validate: {
            validator: function(value) {
                if (!value) return true;
                return validator.isURL(value, {
                    protocols: ['http', 'https'],
                    require_protocol: true
                });
            },
            message: 'Please provide a valid URL for resume'
        }
        // URL to resume file (PDF/DOC)
    },

    // ═════════════════════════════════════════════════════════
    //                      LOCATION
    // ═════════════════════════════════════════════════════════
    
    location: {
        city: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true,
            default: 'Pakistan'
        }
    },

       // ═════════════════════════════════════════════════════════
    //                   JOB PREFERENCES
    // ═════════════════════════════════════════════════════════
    
    preferences: {
        // Expected salary range
        expectedSalary: {
            min: {
                type: Number,
                min: [VALIDATION.MIN_SALARY, 'Minimum salary invalid'],
                max: [VALIDATION.MAX_SALARY, 'Minimum salary too high']
            },
            max: {
                type: Number,
                min: [VALIDATION.MIN_SALARY, 'Maximum salary invalid'],
                max: [VALIDATION.MAX_SALARY, 'Maximum salary too high']
            },
            currency: {
                type: String,
                enum: CURRENCIES,
                default: 'PKR'
            }
        },
        
        // Preferred job types (full-time, part-time, etc.)
        jobType: {
            type: [String],
            enum: JOB_TYPES_ARRAY
            // Example: ["full-time", "part-time"]
        },
        
        // Preferred work modes (onsite, remote, hybrid)
        workMode: {
            type: [String],
            enum: WORK_MODES_ARRAY
            // Example: ["remote", "hybrid"]
        },
        
        // Preferred work locations
        preferredLocations: {
            type: [String]
            // Example: ["Karachi", "Lahore", "Remote"]
        }
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
        github: {
            type: String,
            validate: {
                validator: function(value) {
                    if (!value) return true;
                    return validator.isURL(value);
                },
                message: 'Please provide a valid GitHub URL'
            }
        },
        portfolio: {
            type: String,
            validate: {
                validator: function(value) {
                    if (!value) return true;
                    return validator.isURL(value);
                },
                message: 'Please provide a valid Portfolio URL'
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
        // Percentage of profile completion (calculated)
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

seekerProfileSchema.index({ userId: 1 }, { unique: true });
seekerProfileSchema.index({ 'location.city': 1 });
seekerProfileSchema.index({ skills: 1 });
seekerProfileSchema.index({ title: 'text', bio: 'text' });

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Total years of experience
seekerProfileSchema.virtual('totalExperience').get(function() {
    if (!this.experience || this.experience.length === 0) {
        return 0;
    }
    
    let totalMonths = 0;
    
    this.experience.forEach(exp => {
        const start = new Date(exp.startDate);
        const end = exp.isCurrent ? new Date() : new Date(exp.endDate);
        
        const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                       (end.getMonth() - start.getMonth());
        
        totalMonths += months;
    });
    
    return Math.round(totalMonths / 12 * 10) / 10; // Years with 1 decimal
});

// ═══════════════════════════════════════════════════════════
//                    PRE MIDDLEWARE (HOOKS)
// ═══════════════════════════════════════════════════════════

// Calculate profile completeness before saving
seekerProfileSchema.pre('save', function(next) {
    let completeness = 0;
    const weights = {
        title: 10,
        bio: 15,
        skills: 15,
        experience: 20,
        education: 15,
        resume: 15,
        location: 5,
        preferences: 5
    };
    
    if (this.title) completeness += weights.title;
    if (this.bio) completeness += weights.bio;
    if (this.skills && this.skills.length > 0) completeness += weights.skills;
    if (this.experience && this.experience.length > 0) completeness += weights.experience;
    if (this.education && this.education.length > 0) completeness += weights.education;
    if (this.resume) completeness += weights.resume;
    if (this.location && this.location.city) completeness += weights.location;
    if (this.preferences && this.preferences.jobType && this.preferences.jobType.length > 0) {
        completeness += weights.preferences;
    }
    
    this.profileCompleteness = completeness;
    next();
});

// ═══════════════════════════════════════════════════════════
//                      INSTANCE METHODS
// ═══════════════════════════════════════════════════════════

// Add skill
seekerProfileSchema.methods.addSkill = function(skill) {
    if (!this.skills.includes(skill)) {
        this.skills.push(skill);
    }
    return this.save();
};

// Remove skill
seekerProfileSchema.methods.removeSkill = function(skill) {
    this.skills = this.skills.filter(s => s !== skill);
    return this.save();
};

// Add experience
seekerProfileSchema.methods.addExperience = function(experienceData) {
    this.experience.push(experienceData);
    return this.save();
};

// Add education
seekerProfileSchema.methods.addEducation = function(educationData) {
    this.education.push(educationData);
    return this.save();
};

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Find by user ID
seekerProfileSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId }).populate('userId', 'firstName lastName email avatar');
};

// Search profiles by skills
seekerProfileSchema.statics.searchBySkills = function(skills) {
    return this.find({ skills: { $in: skills } })
        .populate('userId', 'firstName lastName email avatar');
};

// Get profiles by location
seekerProfileSchema.statics.findByLocation = function(city) {
    return this.find({ 'location.city': city })
        .populate('userId', 'firstName lastName email avatar');
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const SeekerProfile = mongoose.model('SeekerProfile', seekerProfileSchema);

module.exports = SeekerProfile;