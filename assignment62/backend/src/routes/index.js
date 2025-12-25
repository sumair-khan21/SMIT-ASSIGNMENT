const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const seekerRoutes = require('./seekerRoutes');
const employerRoutes = require('./employerRoutes');
// const jobRoutes = require('./jobRoutes');              // Coming in Phase 4
// const applicationRoutes = require('./applicationRoutes'); // Coming in Phase 5

// ═══════════════════════════════════════════════════════════
//                      MOUNT ROUTES
// ═══════════════════════════════════════════════════════════

router.use('/auth', authRoutes);
router.use('/seeker', seekerRoutes);
router.use('/employer', employerRoutes);
// router.use('/jobs', jobRoutes);
// router.use('/applications', applicationRoutes);

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
      employer: '/api/employer'
    }
  });
});

module.exports = router;