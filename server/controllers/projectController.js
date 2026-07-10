const Project = require('../models/Project');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const sortOrder = sort === 'oldest' ? 1 : -1;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(parseInt(limit)),
    Project.countDocuments(filter),
  ]);

  res.json(new ApiResponse(200, 'Projects fetched', { projects, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) }));
});

exports.getOne = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  res.json(new ApiResponse(200, 'Project fetched', { project }));
});

exports.create = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Project created', { project }));
});

exports.update = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, 'Project not found');
  res.json(new ApiResponse(200, 'Project updated', { project }));
});

exports.delete = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  res.json(new ApiResponse(200, 'Project deleted'));
});
