const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, default: '' },
    current: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
