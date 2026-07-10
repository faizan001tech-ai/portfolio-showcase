const Contact = require('../models/Contact');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) throw new ApiError(400, 'All fields are required');
  const contact = await Contact.create({ name, email, message });
  res.status(201).json(new ApiResponse(201, 'Message sent successfully', { contact }));
});

exports.getAll = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(new ApiResponse(200, 'Messages fetched', { contacts }));
});
