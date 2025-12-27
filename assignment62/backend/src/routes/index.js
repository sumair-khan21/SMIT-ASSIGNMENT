const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const seekerRoutes = require('./seekerRoutes');
const employerRoutes = require('./employerRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');
const savedJobRoutes = require('./savedJobRoutes');

// ═══════════════════════════════════════════════════════════
//                      MOUNT ROUTES
// ═══════════════════════════════════════════════════════════

router.use('/auth', authRoutes);
router.use('/seeker', seekerRoutes);
router.use('/employer', employerRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/saved-jobs', savedJobRoutes);

// ═══════════════════════════════════════════════════════════
//                    HEALTH CHECK ROUTE
// ═══════════════════════════════════════════════════════════

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    routes: {
      auth: '/api/auth',
      seeker: '/api/seeker',
      employer: '/api/employer',
      jobs: '/api/jobs',
      applications: '/api/applications',
      savedJobs: '/api/saved-jobs'
    }
  });
});

module.exports = router;