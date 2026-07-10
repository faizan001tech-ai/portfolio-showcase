const Skill = require('../models/Skill');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.json(new ApiResponse(200, 'Skills fetched', { skills }));
});

exports.create = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(new ApiResponse(201, 'Skill created', { skill }));
});

exports.update = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!skill) throw new ApiError(404, 'Skill not found');
  res.json(new ApiResponse(200, 'Skill updated', { skill }));
});

exports.delete = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  res.json(new ApiResponse(200, 'Skill deleted'));
});
