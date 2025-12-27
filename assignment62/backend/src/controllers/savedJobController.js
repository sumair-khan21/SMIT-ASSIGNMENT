const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// ═══════════════════════════════════════════════════════════
//                  SAVED JOB CONTROLLERS
// ═══════════════════════════════════════════════════════════

// @desc    Get all saved jobs for current user
// @route   GET /api/saved-jobs
// @access  Private (Seeker only)
exports.getMySavedJobs = async (req, res, next) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.user.id })
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'companyName companyLogo industry location'
        }
      })
      .sort({ savedAt: -1 });

    // Filter out null jobs (in case job was deleted)
    const validSavedJobs = savedJobs.filter(saved => saved.jobId !== null);

    res.status(200).json(
      new ApiResponse(200, {
        savedJobs: validSavedJobs,
        count: validSavedJobs.length
      }, 'Saved jobs fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Save a job (Bookmark)
// @route   POST /api/saved-jobs/:jobId
// @access  Private (Seeker only)
exports.saveJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check if already saved
    const alreadySaved = await SavedJob.findOne({
      userId: req.user.id,
      jobId
    });

    if (alreadySaved) {
      throw new ApiError(400, 'Job already saved');
    }

    // Save job
    const savedJob = await SavedJob.create({
      userId: req.user.id,
      jobId
    });

    // Populate
    await savedJob.populate('jobId', 'title location salary');
    await savedJob.populate({
      path: 'jobId',
      populate: {
        path: 'companyId',
        select: 'companyName companyLogo'
      }
    });

    res.status(201).json(
      new ApiResponse(201, { savedJob }, 'Job saved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Remove saved job (Unsave/Unbookmark)
// @route   DELETE /api/saved-jobs/:jobId
// @access  Private (Seeker only)
exports.unsaveJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const savedJob = await SavedJob.findOne({
      userId: req.user.id,
      jobId
    });

    if (!savedJob) {
      throw new ApiError(404, 'Saved job not found');
    }

    await savedJob.deleteOne();

    res.status(200).json(
      new ApiResponse(200, null, 'Job removed from saved list')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Check if a job is saved by current user
// @route   GET /api/saved-jobs/check/:jobId
// @access  Private (Seeker only)
exports.checkIfSaved = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const isSaved = await SavedJob.exists({
      userId: req.user.id,
      jobId
    });

    res.status(200).json(
      new ApiResponse(200, { isSaved: !!isSaved }, 'Check completed')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get saved jobs count
// @route   GET /api/saved-jobs/count
// @access  Private (Seeker only)
exports.getSavedJobsCount = async (req, res, next) => {
  try {
    const count = await SavedJob.countDocuments({ userId: req.user.id });

    res.status(200).json(
      new ApiResponse(200, { count }, 'Count fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle save job (Save if not saved, Unsave if saved)
// @route   POST /api/saved-jobs/:jobId/toggle
// @access  Private (Seeker only)
exports.toggleSaveJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check if already saved
    const savedJob = await SavedJob.findOne({
      userId: req.user.id,
      jobId
    });

    if (savedJob) {
      // Unsave
      await savedJob.deleteOne();
      return res.status(200).json(
        new ApiResponse(200, { saved: false }, 'Job removed from saved list')
      );
    } else {
      // Save
      const newSavedJob = await SavedJob.create({
        userId: req.user.id,
        jobId
      });

      await newSavedJob.populate('jobId', 'title location');

      return res.status(201).json(
        new ApiResponse(201, { saved: true, savedJob: newSavedJob }, 'Job saved successfully')
      );
    }
  } catch (error) {
    next(error);
  }
};