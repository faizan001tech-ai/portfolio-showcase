const Certificate = require('../models/Certificate');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find().sort({ date: -1 });
  res.json(new ApiResponse(200, 'Certificates fetched', { certificates }));
});

exports.create = asyncHandler(async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Certificate created', { certificate }));
});

exports.update = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!certificate) throw new ApiError(404, 'Certificate not found');
  res.json(new ApiResponse(200, 'Certificate updated', { certificate }));
});

exports.delete = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) throw new ApiError(404, 'Certificate not found');
  res.json(new ApiResponse(200, 'Certificate deleted'));
});
