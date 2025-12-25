const EmployerProfile = require('../models/EmployerProfile');
const Job = require('../models/Job');
const Application = require('../models/Application');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// ═══════════════════════════════════════════════════════════
//                  EMPLOYER PROFILE CONTROLLERS
// ═══════════════════════════════════════════════════════════

// @desc    Get employer profile
// @route   GET /api/employer/profile
// @access  Private (Employer only)
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.user.id })
      .populate('userId', 'firstName lastName email phone avatar');

    if (!profile) {
      throw new ApiError(404, 'Company profile not found. Please create your company profile first.');
    }

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Company profile fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create employer profile
// @route   POST /api/employer/profile
// @access  Private (Employer only)
exports.createProfile = async (req, res, next) => {
  try {
    // Check if profile already exists
    const existingProfile = await EmployerProfile.findOne({ userId: req.user.id });
    
    if (existingProfile) {
      throw new ApiError(400, 'Company profile already exists. Use update endpoint to modify.');
    }

    // Create new profile
    const profileData = {
      userId: req.user.id,
      ...req.body
    };

    const profile = await EmployerProfile.create(profileData);

    // Populate user data
    await profile.populate('userId', 'firstName lastName email phone avatar');

    res.status(201).json(
      new ApiResponse(201, { profile }, 'Company profile created successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update employer profile
// @route   PUT /api/employer/profile
// @access  Private (Employer only)
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await EmployerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Company profile not found. Please create your profile first.');
    }

    // Update profile
    profile = await EmployerProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('userId', 'firstName lastName email phone avatar');

    res.status(200).json(
      new ApiResponse(200, { profile }, 'Company profile updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employer profile
// @route   DELETE /api/employer/profile
// @access  Private (Employer only)
exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Company profile not found');
    }

    await profile.deleteOne();

    res.status(200).json(
      new ApiResponse(200, null, 'Company profile deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get employer dashboard stats
// @route   GET /api/employer/dashboard
// @access  Private (Employer only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne({ userId: req.user.id });

    if (!profile) {
      throw new ApiError(404, 'Company profile not found');
    }

    // Get total jobs posted
    const totalJobs = await Job.countDocuments({ postedBy: req.user.id });

    // Get active jobs
    const activeJobs = await Job.countDocuments({ 
      postedBy: req.user.id, 
      status: 'active' 
    });

    // Get total applications received
    const totalApplications = await Application.countDocuments({
      job: { $in: await Job.find({ postedBy: req.user.id }).distinct('_id') }
    });

    // Get pending applications
    const pendingApplications = await Application.countDocuments({
      job: { $in: await Job.find({ postedBy: req.user.id }).distinct('_id') },
      status: 'pending'
    });

    // Get recent applications (last 5)
    const recentApplications = await Application.find({
      job: { $in: await Job.find({ postedBy: req.user.id }).distinct('_id') }
    })
      .populate('applicant', 'firstName lastName email')
      .populate('job', 'title')
      .sort({ appliedAt: -1 })
      .limit(5);

    const stats = {
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      recentApplications
    };

    res.status(200).json(
      new ApiResponse(200, { stats }, 'Dashboard stats fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs posted by employer
// @route   GET /api/employer/jobs
// @access  Private (Employer only)
exports.getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id })
      .populate('postedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json(
      new ApiResponse(200, { jobs, count: jobs.length }, 'Jobs fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a specific job
// @route   GET /api/employer/jobs/:jobId/applications
// @access  Private (Employer only)
exports.getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findOne({ 
      _id: req.params.jobId, 
      postedBy: req.user.id 
    });

    if (!job) {
      throw new ApiError(404, 'Job not found or you do not have permission');
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'firstName lastName email phone avatar')
      .populate({
        path: 'applicant',
        populate: {
          path: 'seekerProfile',
          select: 'title skills experience education'
        }
      })
      .sort({ appliedAt: -1 });

    res.status(200).json(
      new ApiResponse(200, { 
        applications, 
        count: applications.length 
      }, 'Applications fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};