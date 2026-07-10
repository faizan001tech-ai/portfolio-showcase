const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    throw new ApiError(401, 'Not authorized. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) {
      throw new ApiError(401, 'Admin not found.');
    }
    next();
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token.');
  }
});

module.exports = protect;
