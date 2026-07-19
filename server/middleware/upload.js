const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Verify Cloudinary is configured
console.log('🔧 Cloudinary Configuration:');
console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'}`);
console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`   API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}`);

// Use memory storage to handle file in memory before Cloudinary upload
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only image files are allowed'));
};

// Create multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Custom middleware to upload to Cloudinary after multer
const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    // Get category from request body, default to 'general'
    const category = req.body?.category || 'general';
    
    // Map categories to folders
    const folderMap = {
      frontend: 'portfolio/frontend',
      fullstack: 'portfolio/fullstack',
      ai: 'portfolio/ai',
      mini: 'portfolio/mini',
      general: 'portfolio',
    };

    const folder = folderMap[category] || 'portfolio';

    console.log(`📁 Upload to Cloudinary folder: ${folder}`);

    // Upload to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          resource_type: 'auto',
          quality: 'auto:good',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Attach Cloudinary result to request file
    req.file.cloudinaryResult = result;
    req.file.secure_url = result.secure_url;
    req.file.public_id = result.public_id;
    
    console.log('✅ Image uploaded to Cloudinary:', {
      url: result.secure_url,
      public_id: result.public_id,
      folder: folder,
    });

    next();
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Cloudinary upload failed',
      error: error.message 
    });
  }
};

module.exports = { upload, uploadToCloudinary };
