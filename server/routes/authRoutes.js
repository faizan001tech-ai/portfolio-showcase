const express = require('express');
const router = express.Router();
const { login, getMe, changePassword } = require('../controllers/authController');
const protect = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

module.exports = router;
