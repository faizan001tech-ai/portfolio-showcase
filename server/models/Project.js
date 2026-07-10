const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    image: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    category: { type: String, enum: ['frontend', 'fullstack', 'ai'], required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
