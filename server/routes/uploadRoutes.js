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

    // Get category from request body to organize in Cloudinary folders
    const category = req.body.category || 'general';
    const categoryFolderMap = {
      frontend: 'portfolio/frontend',
      fullstack: 'portfolio/fullstack',
      ai: 'portfolio/ai',
      mini: 'portfolio/mini',
      general: 'portfolio',
    };

    const targetFolder = categoryFolderMap[category] || 'portfolio';

    // Move file to category-specific folder if needed
    if (category !== 'general') {
      try {
        const publicId = req.file.public_id;
        await cloudinary.api.create_folder(targetFolder);
        await cloudinary.uploader.rename(publicId, `${targetFolder}/${req.file.filename.split('/').pop()}`);
      } catch (err) {
        // Folder may already exist or file is already in place
        console.log('Folder organization info:', err.message);
      }
    }

    // Return Cloudinary URL
    const imageUrl = req.file.secure_url;

    res.json({
      success: true,
      imageUrl,
      publicId: req.file.public_id,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
