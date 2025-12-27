const express = require('express');
const router = express.Router();
const {
  getMySavedJobs,
  saveJob,
  unsaveJob,
  checkIfSaved,
  getSavedJobsCount,
  toggleSaveJob
} = require('../controllers/savedJobController');
const { protect, restrictTo } = require('../middlewares/auth');

// ═══════════════════════════════════════════════════════════
//        ALL ROUTES ARE PROTECTED & SEEKER ONLY
// ═══════════════════════════════════════════════════════════

// Apply authentication and role restriction to all routes
router.use(protect);
router.use(restrictTo('seeker'));

// ═══════════════════════════════════════════════════════════
//                  SAVED JOB ROUTES
// ═══════════════════════════════════════════════════════════

// Get all saved jobs
router.get('/', getMySavedJobs);

// Get saved jobs count
router.get('/count', getSavedJobsCount);

// Check if a job is saved
router.get('/check/:jobId', checkIfSaved);

// Toggle save/unsave (smart route)
router.post('/:jobId/toggle', toggleSaveJob);

// Save a job
router.post('/:jobId', saveJob);

// Unsave a job
router.delete('/:jobId', unsaveJob);

module.exports = router;