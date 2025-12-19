// ═══════════════════════════════════════════════════════════
//                        JOB MODEL
//              (Job postings by employers)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const { 
    VALIDATION,
    JOB_TYPES_ARRAY,
    WORK_MODES_ARRAY,
    EXPERIENCE_LEVELS_ARRAY,
    JOB_STATUS_ARRAY,
    CURRENCIES
} = require('../utils/constants');

// ─────────────────────────────────────────────────────────────
// Job Schema
// ─────────────────────────────────────────────────────────────
const jobSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                  REFERENCES
    // ═════════════════════════════════════════════════════════
    
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Employer ID is required']
    },

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployerProfile',
        required: [true, 'Company ID is required']
    },

    // ═════════════════════════════════════════════════════════
    //                  BASIC INFORMATION
    // ═════════════════════════════════════════════════════════
    
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        minlength: [5, 'Job title must be at least 5 characters'],
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },

    description: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true,
        minlength: [50, 'Description must be at least 50 characters'],
        maxlength: [VALIDATION.DESCRIPTION_MAX_LENGTH, `Description cannot exceed ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`]
    },

    // ═════════════════════════════════════════════════════════
    //                  JOB REQUIREMENTS
    // ═════════════════════════════════════════════════════════
    
    requirements: {
        type: [String],
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one requirement is needed'
        }
        // Example: ["3+ years of experience", "Bachelor's degree"]
    },

    responsibilities: {
        type: [String],
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'At least one responsibility is needed'
        }
        // Example: ["Lead development team", "Code reviews"]
    },

    skills: {
        type: [String],
        validate: {
            validator: function(value) {
                return value.length > 0 && value.length <= VALIDATION.SKILLS_MAX_COUNT;
            },
            message: `Skills must be between 1 and ${VALIDATION.SKILLS_MAX_COUNT}`
        }
        // Example: ["React", "Node.js", "MongoDB"]
    },

    // ═════════════════════════════════════════════════════════
    //                  JOB DETAILS
    // ═════════════════════════════════════════════════════════
    
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
        enum: {
            values: JOB_TYPES_ARRAY,
            message: '{VALUE} is not a valid job type'
        }
    },

    workMode: {
        type: String,
        required: [true, 'Work mode is required'],
        enum: {
            values: WORK_MODES_ARRAY,
            message: '{VALUE} is not a valid work mode'
        }
    },

    experienceLevel: {
        type: String,
        required: [true, 'Experience level is required'],
        enum: {
            values: EXPERIENCE_LEVELS_ARRAY,
            message: '{VALUE} is not a valid experience level'
        }
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
        },
        isRemote: {
            type: Boolean,
            default: false
        }
    },

    // ═════════════════════════════════════════════════════════
    //                      SALARY
    // ═════════════════════════════════════════════════════════
    
    salary: {
        min: {
            type: Number,
            min: [VALIDATION.MIN_SALARY, 'Minimum salary invalid']
        },
        max: {
            type: Number,
            validate: {
                validator: function(value) {
                    if (value && this.salary.min) {
                        return value >= this.salary.min;
                    }
                    return true;
                },
                message: 'Maximum salary must be greater than minimum'
            }
        },
        currency: {
            type: String,
            enum: CURRENCIES,
            default: 'PKR'
        },
        isNegotiable: {
            type: Boolean,
            default: false
        },
        showSalary: {
            type: Boolean,
            default: true
            // Kuch companies salary hide karti hain
        }
    },

    // ═════════════════════════════════════════════════════════
    //                  APPLICATION DETAILS
    // ═════════════════════════════════════════════════════════
    
    applicationDeadline: {
        type: Date,
        validate: {
            validator: function(value) {
                if (value) {
                    return value > Date.now();
                }
                return true;
            },
            message: 'Application deadline must be in future'
        }
    },

    openPositions: {
        type: Number,
        required: [true, 'Number of open positions is required'],
        min: [1, 'At least one position must be open'],
        default: 1
    },

    // ═════════════════════════════════════════════════════════
    //                  STATUS & STATISTICS
    // ═════════════════════════════════════════════════════════
    
    status: {
        type: String,
        enum: {
            values: JOB_STATUS_ARRAY,
            message: '{VALUE} is not a valid status'
        },
        default: 'active'
    },

    views: {
        type: Number,
        default: 0
    },

    applicationsCount: {
        type: Number,
        default: 0
    },

    // ═════════════════════════════════════════════════════════
    //                  ADDITIONAL INFO
    // ═════════════════════════════════════════════════════════
    
    benefits: {
        type: [String]
        // Example: ["Health Insurance", "Annual Bonus"]
    },

    tags: {
        type: [String]
        // Example: ["urgent", "featured"]
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

jobSchema.index({ employerId: 1 });
jobSchema.index({ companyId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ workMode: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ 'location.city': 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ createdAt: -1 }); // Latest jobs first
jobSchema.index({ title: 'text', description: 'text' }); // Text search

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Check if job is expired
jobSchema.virtual('isExpired').get(function() {
    if (this.applicationDeadline) {
        return this.applicationDeadline < new Date();
    }
    return false;
});

// Days remaining to apply
jobSchema.virtual('daysRemaining').get(function() {
    if (this.applicationDeadline) {
        const diff = this.applicationDeadline - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return null;
});

// Salary range display
jobSchema.virtual('salaryRange').get(function() {
    if (this.salary.showSalary && this.salary.min && this.salary.max) {
        return `${this.salary.min} - ${this.salary.max} ${this.salary.currency}`;
    } else if (this.salary.showSalary && this.salary.min) {
        return `${this.salary.min}+ ${this.salary.currency}`;
    }
    return 'Not disclosed';
});

// ═══════════════════════════════════════════════════════════
//                    PRE MIDDLEWARE (HOOKS)
// ═══════════════════════════════════════════════════════════

// Auto-expire jobs
jobSchema.pre('save', function(next) {
    if (this.isExpired && this.status === 'active') {
        this.status = 'expired';
    }
    next();
});

// ═══════════════════════════════════════════════════════════
//                      INSTANCE METHODS
// ═══════════════════════════════════════════════════════════

// Increment view count
jobSchema.methods.incrementViews = function() {
    this.views += 1;
    return this.save();
};

// Increment applications count
jobSchema.methods.incrementApplications = function() {
    this.applicationsCount += 1;
    return this.save();
};

// Close job
jobSchema.methods.closeJob = function() {
    this.status = 'closed';
    return this.save();
};

// Reopen job
jobSchema.methods.reopenJob = function() {
    if (this.isExpired) {
        throw new Error('Cannot reopen expired job. Update deadline first.');
    }
    this.status = 'active';
    return this.save();
};

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Get active jobs
jobSchema.statics.getActiveJobs = function(filters = {}) {
    return this.find({ status: 'active', ...filters })
        .populate('employerId', 'firstName lastName email')
        .populate('companyId', 'companyName companyLogo industry location')
        .sort({ createdAt: -1 });
};

// Search jobs by skills
jobSchema.statics.searchBySkills = function(skills) {
    return this.find({ 
        skills: { $in: skills },
        status: 'active'
    })
    .populate('employerId', 'firstName lastName')
    .populate('companyId', 'companyName companyLogo');
};

// Get jobs by employer
jobSchema.statics.getJobsByEmployer = function(employerId) {
    return this.find({ employerId })
        .populate('companyId', 'companyName companyLogo')
        .sort({ createdAt: -1 });
};

// Get jobs by company
jobSchema.statics.getJobsByCompany = function(companyId) {
    return this.find({ companyId, status: 'active' })
        .populate('employerId', 'firstName lastName')
        .sort({ createdAt: -1 });
};

// Get jobs by location
jobSchema.statics.getJobsByLocation = function(city) {
    return this.find({ 
        'location.city': city,
        status: 'active'
    })
    .populate('companyId', 'companyName companyLogo');
};

// Get remote jobs
jobSchema.statics.getRemoteJobs = function() {
    return this.find({ 
        'location.isRemote': true,
        status: 'active'
    })
    .populate('companyId', 'companyName companyLogo industry');
};

// Advanced search
jobSchema.statics.advancedSearch = function(filters) {
    const query = { status: 'active' };
    
    if (filters.jobType) query.jobType = filters.jobType;
    if (filters.workMode) query.workMode = filters.workMode;
    if (filters.experienceLevel) query.experienceLevel = filters.experienceLevel;
    if (filters.city) query['location.city'] = filters.city;
    if (filters.isRemote) query['location.isRemote'] = true;
    if (filters.skills) query.skills = { $in: filters.skills };
    
    return this.find(query)
        .populate('employerId', 'firstName lastName')
        .populate('companyId', 'companyName companyLogo industry')
        .sort({ createdAt: -1 });
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;