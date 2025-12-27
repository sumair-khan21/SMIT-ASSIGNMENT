const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
  updateApplicationStatus,
  getJobApplications,
  getReceivedApplications,
  getJobApplicationStats
} = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middlewares/auth');

// ═══════════════════════════════════════════════════════════
//                  SEEKER ROUTES
// ═══════════════════════════════════════════════════════════

// Apply for a job (on job routes: /api/jobs/:jobId/apply)
// This will be handled in job routes

// Get my applications (Seeker)
router.get('/my-applications', protect, restrictTo('seeker'), getMyApplications);

// Withdraw application (Seeker)
router.delete('/:id', protect, restrictTo('seeker'), withdrawApplication);

// ═══════════════════════════════════════════════════════════
//                  EMPLOYER ROUTES
// ═══════════════════════════════════════════════════════════

// Get all received applications (Employer)
router.get('/received', protect, restrictTo('employer'), getReceivedApplications);

// Get applications for a specific job (Employer)
router.get('/job/:jobId', protect, restrictTo('employer'), getJobApplications);

// Get application statistics for a job (Employer)
router.get('/job/:jobId/stats', protect, restrictTo('employer'), getJobApplicationStats);

// Update application status (Employer)
router.patch('/:id/status', protect, restrictTo('employer'), updateApplicationStatus);

// ═══════════════════════════════════════════════════════════
//                  SHARED ROUTES
// ═══════════════════════════════════════════════════════════

// Get single application (Seeker or Employer)
router.get('/:id', protect, getApplicationById);

module.exports = router;