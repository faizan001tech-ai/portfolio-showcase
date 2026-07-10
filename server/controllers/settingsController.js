const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Service = require('../models/Service');

exports.getProfile = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, 'Profile fetched', { admin: req.admin }));
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, title, avatar, resumeUrl, socialLinks } = req.body;
  const admin = await Admin.findByIdAndUpdate(
    req.admin._id,
    { name, bio, title, avatar, resumeUrl, socialLinks },
    { new: true, runValidators: true }
  );
  if (!admin) throw new ApiError(404, 'Admin not found');
  res.json(new ApiResponse(200, 'Profile updated', { admin }));
});

exports.getStats = asyncHandler(async (req, res) => {
  const [projects, skills, certificates, services] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Certificate.countDocuments(),
    Service.countDocuments(),
  ]);
  res.json(new ApiResponse(200, 'Stats fetched', { projects, skills, certificates, services }));
});

exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  const result = await cloudinary.uploader.upload(req.file.path, { folder: 'portfolio' });
  res.json(new ApiResponse(200, 'Image uploaded', { url: result.secure_url, public_id: result.public_id }));
});
