// ═══════════════════════════════════════════════════════════
//                    SAVED JOB MODEL
//              (Bookmarked/Saved jobs by seekers)
// ═══════════════════════════════════════════════════════════

const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────
// Saved Job Schema
// ─────────────────────────────────────────────────────────────
const savedJobSchema = new mongoose.Schema({
    
    // ═════════════════════════════════════════════════════════
    //                  REFERENCES
    // ═════════════════════════════════════════════════════════
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required']
    },

    // ═════════════════════════════════════════════════════════
    //                  TIMESTAMP
    // ═════════════════════════════════════════════════════════
    
    savedAt: {
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

// Composite unique index - prevent duplicate saves
savedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

savedJobSchema.index({ userId: 1 });
savedJobSchema.index({ jobId: 1 });
savedJobSchema.index({ savedAt: -1 }); // Latest saved first

// ═══════════════════════════════════════════════════════════
//                      VIRTUAL FIELDS
// ═══════════════════════════════════════════════════════════

// Days since saved
savedJobSchema.virtual('daysSinceSaved').get(function() {
    const diff = Date.now() - this.savedAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// ═══════════════════════════════════════════════════════════
//                      STATIC METHODS
// ═══════════════════════════════════════════════════════════

// Get user's saved jobs
savedJobSchema.statics.getUserSavedJobs = function(userId) {
    return this.find({ userId })
        .populate({
            path: 'jobId',
            populate: {
                path: 'companyId',
                select: 'companyName companyLogo industry'
            }
        })
        .sort({ savedAt: -1 });
};

// Check if job is saved by user
savedJobSchema.statics.isSaved = function(userId, jobId) {
    return this.exists({ userId, jobId });
};

// Save a job
savedJobSchema.statics.saveJob = async function(userId, jobId) {
    // Check if already saved
    const exists = await this.exists({ userId, jobId });
    
    if (exists) {
        throw new Error('Job already saved');
    }
    
    return this.create({ userId, jobId });
};

// Unsave a job
savedJobSchema.statics.unsaveJob = function(userId, jobId) {
    return this.deleteOne({ userId, jobId });
};

// Get saved jobs count for a user
savedJobSchema.statics.getSavedCount = function(userId) {
    return this.countDocuments({ userId });
};

// Get users who saved a job
savedJobSchema.statics.getJobSavers = function(jobId) {
    return this.find({ jobId })
        .populate('userId', 'firstName lastName email')
        .sort({ savedAt: -1 });
};

// ═══════════════════════════════════════════════════════════
//                      CREATE MODEL
// ═══════════════════════════════════════════════════════════

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;