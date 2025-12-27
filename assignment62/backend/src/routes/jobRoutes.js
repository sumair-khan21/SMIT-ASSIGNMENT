const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  updateJobStatus,
  getMyJobs,
  getJobsByCompany
} = require('../controllers/jobController');
const { applyForJob } = require('../controllers/applicationController');
const { protect, restrictTo, optionalAuth } = require('../middlewares/auth');

// ═══════════════════════════════════════════════════════════
//                      PUBLIC ROUTES
// ═══════════════════════════════════════════════════════════

// Get all jobs (with filters) - Public
router.get('/', optionalAuth, getAllJobs);

// ═══════════════════════════════════════════════════════════
//                  EMPLOYER ONLY ROUTES
//          (MUST BE BEFORE :id ROUTES)
// ═══════════════════════════════════════════════════════════

// Get my posted jobs (BEFORE /:id route!)
router.get('/my-jobs', protect, restrictTo('employer'), getMyJobs);

// ═══════════════════════════════════════════════════════════
//              SPECIFIC ROUTES (Before :id)
// ═══════════════════════════════════════════════════════════

// Get jobs by company - Public
router.get('/company/:companyId', getJobsByCompany);

// ═══════════════════════════════════════════════════════════
//                  DYNAMIC ID ROUTES
//          (MUST BE AFTER SPECIFIC ROUTES)
// ═══════════════════════════════════════════════════════════

// Get single job - Public
router.get('/:id', getJobById);

// Apply for a job (Seeker only)
router.post('/:jobId/apply', protect, restrictTo('seeker'), applyForJob);

// Update job
router.put('/:id', protect, restrictTo('employer'), updateJob);

// Delete job
router.delete('/:id', protect, restrictTo('employer'), deleteJob);

// Update job status
router.patch('/:id/status', protect, restrictTo('employer'), updateJobStatus);

// ═══════════════════════════════════════════════════════════
//                  CREATE JOB ROUTE
// ═══════════════════════════════════════════════════════════

// Create new job
router.post('/', protect, restrictTo('employer'), createJob);

module.exports = router;