// ═══════════════════════════════════════════════════════════
//                    APPLICATION MODEL
//              (Job applications by seekers)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');
const validator = require('validator');
const { APPLICATION_STATUS_ARRAY } = require('../utils/constants');

// ─────────────────────────────────────────────────────────────
// Application Schema
// ─────────────────────────────────────────────────────────────
const applicationSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                  REFERENCES
    // ═════════════════════════════════════════════════════════
    
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required']
    },

    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Seeker ID is required']
    },

    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Employer ID is required']
    },

    // ═════════════════════════════════════════════════════════
    //                  APPLICATION DETAILS
    // ═════════════════════════════════════════════════════════
    
    coverLetter: {
        type: String,
        trim: true,
        maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
    },

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
        // URL to resume (can be different from profile resume)
    },

    // ═════════════════════════════════════════════════════════
    //                  STATUS MANAGEMENT
    // ═════════════════════════════════════════════════════════
    
    status: {
        type: String,
        enum: {
            values: APPLICATION_STATUS_ARRAY,
            message: '{VALUE} is not a valid application status'
        },
        default: 'pending'
    },

    notes: {
        type: String,
        trim: true,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
        // Private notes by employer (not visible to seeker)
    },

    // ═════════════════════════════════════════════════════════
    //                  STATUS HISTORY
    // ═════════════════════════════════════════════════════════
    
    statusHistory: [{
        status: {
            type: String,
            enum: APPLICATION_STATUS_ARRAY,
            required: true
        },
        changedAt: {
            type: Date,
            default: Date.now
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        note: String
    }],

    // ═════════════════════════════════════════════════════════
    //                  TIMESTAMPS
    // ═════════════════════════════════════════════════════════
    
    appliedAt: {
        type: Date,
        default: Date.now
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

// Composite index - prevent duplicate applications
applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

applicationSchema.index({ jobId: 1 });
applicationSchema.index({ seekerId: 1 });
applicationSchema.index({ employerId: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ appliedAt: -1 }); // Latest applications first

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Days since applied
applicationSchema.virtual('daysSinceApplied').get(function() {
    const diff = Date.now() - this.appliedAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// ═══════════════════════════════════════════════════════════
//                    PRE MIDDLEWARE (HOOKS)
// ═══════════════════════════════════════════════════════════

// Add initial status to history when created
applicationSchema.pre('save', function(next) {
    if (this.isNew) {
        this.statusHistory.push({
            status: this.status,
            changedAt: this.appliedAt
        });
    }
    next();
});

// ═══════════════════════════════════════════════════════════
//                      INSTANCE METHODS
// ═══════════════════════════════════════════════════════════

// Update application status
applicationSchema.methods.updateStatus = function(newStatus, changedBy, note) {
    this.status = newStatus;
    
    this.statusHistory.push({
        status: newStatus,
        changedAt: new Date(),
        changedBy: changedBy,
        note: note
    });
    
    return this.save();
};

// Shortlist application
applicationSchema.methods.shortlist = function(employerId, note) {
    return this.updateStatus('shortlisted', employerId, note);
};

// Reject application
applicationSchema.methods.reject = function(employerId, note) {
    return this.updateStatus('rejected', employerId, note);
};

// Mark as interviewed
applicationSchema.methods.markInterviewed = function(employerId, note) {
    return this.updateStatus('interviewed', employerId, note);
};

// Hire candidate
applicationSchema.methods.hire = function(employerId, note) {
    return this.updateStatus('hired', employerId, note);
};

// Withdraw application (by seeker)
applicationSchema.methods.withdraw = function() {
    return this.updateStatus('withdrawn', this.seekerId, 'Withdrawn by applicant');
};

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Get applications for a job
applicationSchema.statics.getJobApplications = function(jobId, status = null) {
    const query = { jobId };
    if (status) query.status = status;
    
    return this.find(query)
        .populate('seekerId', 'firstName lastName email avatar')
        .sort({ appliedAt: -1 });
};

// Get seeker's applications
applicationSchema.statics.getSeekerApplications = function(seekerId, status = null) {
    const query = { seekerId };
    if (status) query.status = status;
    
    return this.find(query)
        .populate('jobId', 'title location salary status')
        .populate('employerId', 'firstName lastName')
        .sort({ appliedAt: -1 });
};

// Get employer's received applications
applicationSchema.statics.getEmployerApplications = function(employerId, status = null) {
    const query = { employerId };
    if (status) query.status = status;
    
    return this.find(query)
        .populate('jobId', 'title')
        .populate('seekerId', 'firstName lastName email avatar')
        .sort({ appliedAt: -1 });
};

// Check if seeker already applied
applicationSchema.statics.hasApplied = function(jobId, seekerId) {
    return this.exists({ jobId, seekerId });
};

// Get application statistics for a job
applicationSchema.statics.getJobStats = async function(jobId) {
    const stats = await this.aggregate([
        { $match: { jobId: mongoose.Types.ObjectId(jobId) } },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);
    
    return stats;
};

// Get pending applications count for employer
applicationSchema.statics.getPendingCount = function(employerId) {
    return this.countDocuments({ 
        employerId, 
        status: 'pending' 
    });
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;