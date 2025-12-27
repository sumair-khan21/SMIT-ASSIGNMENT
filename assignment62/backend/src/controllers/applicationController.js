const Application = require('../models/Application');
const Job = require('../models/Job');
const SeekerProfile = require('../models/SeekerProfile');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// ═══════════════════════════════════════════════════════════
//                  APPLICATION CONTROLLERS
// ═══════════════════════════════════════════════════════════

// @desc    Apply for a job
// @route   POST /api/jobs/:jobId/apply
// @access  Private (Seeker only)
exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resume } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check if job is active
    if (job.status !== 'active') {
      throw new ApiError(400, 'This job is no longer accepting applications');
    }

    // Check if deadline passed
    if (job.applicationDeadline && job.applicationDeadline < new Date()) {
      throw new ApiError(400, 'Application deadline has passed');
    }

    // Check if seeker has profile
    const seekerProfile = await SeekerProfile.findOne({ userId: req.user.id });
    if (!seekerProfile) {
      throw new ApiError(400, 'Please create your profile before applying for jobs');
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      seekerId: req.user.id
    });

    if (existingApplication) {
      throw new ApiError(400, 'You have already applied for this job');
    }

    // Create application
    const application = await Application.create({
      jobId,
      seekerId: req.user.id,
      employerId: job.employerId,
      coverLetter,
      resume: resume || seekerProfile.resume
    });

    // Increment job applications count
    await job.incrementApplications();

    // Populate
    await application.populate('seekerId', 'firstName lastName email avatar');
    await application.populate('jobId', 'title location salary');

    res.status(201).json(
      new ApiResponse(201, { application }, 'Application submitted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get my applications (Seeker)
// @route   GET /api/applications/my-applications
// @access  Private (Seeker only)
exports.getMyApplications = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = { seekerId: req.user.id };
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate('jobId', 'title location salary status companyId')
      .populate({
        path: 'jobId',
        populate: {
          path: 'companyId',
          select: 'companyName companyLogo'
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

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private (Seeker or Employer)
exports.getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('seekerId', 'firstName lastName email phone avatar')
      .populate('jobId', 'title description location salary')
      .populate('employerId', 'firstName lastName email')
    //   .populate({
    //     path: 'seekerId',
    //     populate: {
    //       path: 'seekerProfile',
    //       select: 'title bio skills experience education'
    //     }
    //   });

    if (!application) {
      throw new ApiError(404, 'Application not found');
    }

    // Check authorization
    const isSeeker = application.seekerId._id.toString() === req.user.id.toString();
    const isEmployer = application.employerId._id.toString() === req.user.id.toString();

    if (!isSeeker && !isEmployer) {
      throw new ApiError(403, 'You are not authorized to view this application');
    }

    res.status(200).json(
      new ApiResponse(200, { application }, 'Application fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Withdraw application (Seeker)
// @route   DELETE /api/applications/:id
// @access  Private (Seeker only)
exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      throw new ApiError(404, 'Application not found');
    }

    // Check ownership
    if (application.seekerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to withdraw this application');
    }

    // Check if already withdrawn or hired
    if (application.status === 'withdrawn') {
      throw new ApiError(400, 'Application already withdrawn');
    }

    if (application.status === 'hired') {
      throw new ApiError(400, 'Cannot withdraw - you have been hired');
    }

    // Withdraw
    await application.withdraw();

    res.status(200).json(
      new ApiResponse(200, null, 'Application withdrawn successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (Employer)
// @route   PATCH /api/applications/:id/status
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    if (!status) {
      throw new ApiError(400, 'Status is required');
    }

    const validStatuses = ['reviewed', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, `Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      throw new ApiError(404, 'Application not found');
    }

    // Check ownership
    if (application.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to update this application');
    }

    // Update status
    await application.updateStatus(status, req.user.id, notes);

    // Add notes if provided
    if (notes) {
      application.notes = notes;
      await application.save();
    }

    // Populate
    await application.populate('seekerId', 'firstName lastName email');
    await application.populate('jobId', 'title');

    res.status(200).json(
      new ApiResponse(200, { application }, `Application status updated to ${status}`)
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a job (Employer)
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { status } = req.query;

    // Check if job exists and belongs to employer
    const job = await Job.findById(jobId);
    
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    if (job.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to view these applications');
    }

    const query = { jobId };
    if (status) query.status = status;

    const applications = await Application.find(query)
    //   .populate('seekerId', 'firstName lastName email phone avatar')
    //   .populate({
    //     path: 'seekerId',
    //     populate: {
    //       path: 'seekerProfile',
    //       select: 'title skills experience education'
    //     }
    //   })
    .populate('seekerId', 'firstName lastName email phone avatar')
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

// @desc    Get all applications received by employer
// @route   GET /api/applications/received
// @access  Private (Employer only)
exports.getReceivedApplications = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = { employerId: req.user.id };
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate('jobId', 'title location')
      .populate('seekerId', 'firstName lastName email avatar')
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

// @desc    Get application statistics for a job
// @route   GET /api/applications/job/:jobId/stats
// @access  Private (Employer only)
exports.getJobApplicationStats = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and belongs to employer
    const job = await Job.findById(jobId);
    
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    if (job.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to view these statistics');
    }

    const stats = await Application.aggregate([
      { $match: { jobId: job._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      reviewed: 0,
      shortlisted: 0,
      interviewed: 0,
      offered: 0,
      hired: 0,
      rejected: 0,
      withdrawn: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    res.status(200).json(
      new ApiResponse(200, { stats: formattedStats }, 'Statistics fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};