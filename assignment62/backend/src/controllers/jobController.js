const Job = require('../models/Job');
const EmployerProfile = require('../models/EmployerProfile');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// ═══════════════════════════════════════════════════════════
//                  JOB CONTROLLERS
// ═══════════════════════════════════════════════════════════

// @desc    Get all jobs (with filters, search, pagination)
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res, next) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Job.find(JSON.parse(queryStr));

    // Only show active jobs by default
    if (!req.query.status) {
      query = query.find({ status: 'active' });
    }

    // Search functionality
    if (req.query.search) {
      query = query.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { 'location.city': { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }

    // Filter by job type
    if (req.query.jobType) {
      query = query.find({ jobType: req.query.jobType });
    }

    // Filter by work mode
    if (req.query.workMode) {
      query = query.find({ workMode: req.query.workMode });
    }

    // Filter by experience level
    if (req.query.experienceLevel) {
      query = query.find({ experienceLevel: req.query.experienceLevel });
    }

    // Filter by skills
    if (req.query.skills) {
      const skillsArray = req.query.skills.split(',');
      query = query.find({ skills: { $in: skillsArray } });
    }

    // Filter by salary range
    if (req.query.minSalary || req.query.maxSalary) {
      const salaryFilter = {};
      if (req.query.minSalary) salaryFilter['salary.min'] = { $gte: Number(req.query.minSalary) };
      if (req.query.maxSalary) salaryFilter['salary.max'] = { $lte: Number(req.query.maxSalary) };
      query = query.find(salaryFilter);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default: newest first
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Populate
    query = query.populate('employerId', 'firstName lastName email')
                 .populate('companyId', 'companyName companyLogo industry location');

    // Execute query
    const jobs = await query;

    // Get total count for pagination
    const total = await Job.countDocuments(JSON.parse(queryStr));

    res.status(200).json(
      new ApiResponse(200, {
        jobs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }, 'Jobs fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employerId', 'firstName lastName email phone')
      .populate('companyId', 'companyName companyLogo industry location companyWebsite description');

    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Increment views count
    job.views += 1;
    await job.save();

    res.status(200).json(
      new ApiResponse(200, { job }, 'Job fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res, next) => {
  try {
    // Check if employer has a profile
    const employerProfile = await EmployerProfile.findOne({ userId: req.user.id });
    
    if (!employerProfile) {
      throw new ApiError(400, 'Please create your company profile first before posting jobs');
    }

    // Add user and company to job data
    const jobData = {
      ...req.body,
      employerId: req.user.id,
      companyId: employerProfile._id
    };

    const job = await Job.create(jobData);

    // Populate
    await job.populate('employerId', 'firstName lastName email');
    await job.populate('companyId', 'companyName companyLogo');

    res.status(201).json(
      new ApiResponse(201, { job }, 'Job posted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only - own jobs)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check ownership
    if (job.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to update this job');
    }

    // Update job
    job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('employerId', 'firstName lastName email')
     .populate('companyId', 'companyName companyLogo');

    res.status(200).json(
      new ApiResponse(200, { job }, 'Job updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only - own jobs)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check ownership
    if (job.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to delete this job');
    }

    await job.deleteOne();

    res.status(200).json(
      new ApiResponse(200, null, 'Job deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update job status (active/closed/draft)
// @route   PATCH /api/jobs/:id/status
// @access  Private (Employer only - own jobs)
exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status || !['active', 'closed', 'draft'].includes(status)) {
      throw new ApiError(400, 'Invalid status. Must be: active, closed, or draft');
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    // Check ownership
    if (job.employerId.toString() !== req.user.id.toString()) {
      throw new ApiError(403, 'You are not authorized to update this job');
    }

    job.status = status;
    await job.save();

    res.status(200).json(
      new ApiResponse(200, { job }, `Job status updated to ${status}`)
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get my posted jobs (Employer)
// @route   GET /api/jobs/my-jobs
// @access  Private (Employer only)
exports.getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id })
      .populate('companyId', 'companyName companyLogo')
      .sort('-createdAt');

    res.status(200).json(
      new ApiResponse(200, { 
        jobs, 
        count: jobs.length 
      }, 'Your jobs fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs by company
// @route   GET /api/jobs/company/:companyId
// @access  Public
exports.getJobsByCompany = async (req, res, next) => {
  try {
    const jobs = await Job.find({ 
      companyId: req.params.companyId,
      status: 'active'
    })
      .populate('companyId', 'companyName companyLogo industry')
      .sort('-createdAt');

    res.status(200).json(
      new ApiResponse(200, { 
        jobs, 
        count: jobs.length 
      }, 'Company jobs fetched successfully')
    );
  } catch (error) {
    next(error);
  }
};