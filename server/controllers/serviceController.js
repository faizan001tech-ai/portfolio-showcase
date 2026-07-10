const Service = require('../models/Service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(new ApiResponse(200, 'Services fetched', { services }));
});

exports.create = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Service created', { service }));
});

exports.update = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, 'Service updated', { service }));
});

exports.delete = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new ApiError(404, 'Service not found');
  res.json(new ApiResponse(200, 'Service deleted'));
});
