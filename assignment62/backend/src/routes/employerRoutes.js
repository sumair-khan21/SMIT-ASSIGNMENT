const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getDashboardStats,
  getMyJobs,
  getJobApplications
} = require('../controllers/employerController');
const { protect, restrictTo } = require('../middlewares/auth');

// ═══════════════════════════════════════════════════════════
//        ALL ROUTES ARE PROTECTED & EMPLOYER ONLY
// ═══════════════════════════════════════════════════════════

// Apply authentication and role restriction to all routes
router.use(protect);
router.use(restrictTo('employer'));

// ═══════════════════════════════════════════════════════════
//                  COMPANY PROFILE ROUTES
// ═══════════════════════════════════════════════════════════

router.route('/profile')
  .get(getProfile)        // Get company profile
  .post(createProfile)    // Create company profile
  .put(updateProfile)     // Update company profile
  .delete(deleteProfile); // Delete company profile

// ═══════════════════════════════════════════════════════════
//                  DASHBOARD & JOBS ROUTES
// ═══════════════════════════════════════════════════════════

router.get('/dashboard', getDashboardStats);  // Dashboard stats
router.get('/jobs', getMyJobs);               // Get all my jobs
router.get('/jobs/:jobId/applications', getJobApplications); // Applications for specific job

module.exports = router;