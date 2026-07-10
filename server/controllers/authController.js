const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Please provide email and password');

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(admin._id);
  res.json(new ApiResponse(200, 'Login successful', { token, admin: admin.toJSON() }));
});

exports.getMe = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, 'Admin profile', { admin: req.admin }));
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) throw new ApiError(400, 'Both passwords are required');

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();
  res.json(new ApiResponse(200, 'Password changed successfully'));
});
