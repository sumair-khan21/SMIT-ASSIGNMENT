const express = require('express');
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/seekerController');
const { protect, restrictTo } = require('../middlewares/auth');

// ═══════════════════════════════════════════════════════════
//        ALL ROUTES ARE PROTECTED & SEEKER ONLY
// ═══════════════════════════════════════════════════════════

// Apply authentication and role restriction to all routes
router.use(protect);
router.use(restrictTo('seeker'));

// ═══════════════════════════════════════════════════════════
//                  PROFILE ROUTES
// ═══════════════════════════════════════════════════════════

router.route('/profile')
  .get(getProfile)        // Get my profile
  .post(createProfile)    // Create profile
  .put(updateProfile)     // Update profile
  .delete(deleteProfile); // Delete profile

// ═══════════════════════════════════════════════════════════
//                  EXPERIENCE ROUTES
// ═══════════════════════════════════════════════════════════

router.route('/profile/experience')
  .post(addExperience);   // Add experience

router.route('/profile/experience/:expId')
  .put(updateExperience)   // Update experience
  .delete(deleteExperience); // Delete experience

// ═══════════════════════════════════════════════════════════
//                  EDUCATION ROUTES
// ═══════════════════════════════════════════════════════════

router.route('/profile/education')
  .post(addEducation);    // Add education

router.route('/profile/education/:eduId')
  .put(updateEducation)    // Update education
  .delete(deleteEducation); // Delete education

module.exports = router;