const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const protect = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary automatically uploads with secure_url (HTTPS)
    const imageUrl = req.file.secure_url;

    console.log('✅ Image uploaded to Cloudinary:', {
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      category: req.body.category,
    });

    res.json({
      success: true,
      imageUrl,
      publicId: req.file.public_id,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
