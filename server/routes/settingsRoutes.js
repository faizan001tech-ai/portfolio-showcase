const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getStats, uploadImage } = require('../controllers/settingsController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, getStats);
router.post('/upload', protect, upload.single('image'), uploadImage);

module.exports = router;
