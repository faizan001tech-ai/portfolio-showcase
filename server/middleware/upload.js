const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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

// Configure Cloudinary Storage with category-based folders
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
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

    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'auto',
      quality: 'auto:good',
    };
  },
});

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

module.exports = upload;
