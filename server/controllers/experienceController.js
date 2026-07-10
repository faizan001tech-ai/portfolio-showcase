const Experience = require('../models/Experience');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ createdAt: -1 });
  res.json(new ApiResponse(200, 'Experiences fetched', { experiences }));
});

exports.create = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Experience created', { experience }));
});

exports.update = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!experience) throw new ApiError(404, 'Experience not found');
  res.json(new ApiResponse(200, 'Experience updated', { experience }));
});

exports.delete = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  res.json(new ApiResponse(200, 'Experience deleted'));
});
