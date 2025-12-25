const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getMe, 
  updatePassword 
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { 
  registerValidation, 
  loginValidation,
  changePasswordValidation
} = require('../validators/authValidator');

// ═══════════════════════════════════════════════════════════
//                      PUBLIC ROUTES
// ═══════════════════════════════════════════════════════════

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Temporarily disable validation for testing
// router.post('/register', register);  // validation hata di
// router.post('/login', login);

// ═══════════════════════════════════════════════════════════
//                    PROTECTED ROUTES
//            (Require Authentication)
// ═══════════════════════════════════════════════════════════

router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/update-password', protect, changePasswordValidation, updatePassword);

module.exports = router;