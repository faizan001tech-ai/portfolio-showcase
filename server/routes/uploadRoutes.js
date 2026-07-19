const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middleware/upload');
const protect = require('../middleware/auth');

router.post('/', protect, upload.single('image'), uploadToCloudinary, async (req, res) => {
  try {
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary URL from uploadToCloudinary middleware
    const imageUrl = req.file.secure_url;

    console.log('✅ Image uploaded to Cloudinary:', {
      url: imageUrl,
      public_id: req.file.public_id,
      category: req.body.category,
    });

    res.json({
      success: true,
      imageUrl,
      publicId: req.file.public_id,
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
