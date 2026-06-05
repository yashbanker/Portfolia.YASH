const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, required: true, enum: ['AI', 'SaaS', 'Web Apps', 'Ecommerce', 'Dashboard', 'WordPress'] },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  challenges: { type: String, default: '' },
  solution: { type: String, default: '' },
  results: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  screenshots: [{ type: String }],
  technologies: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

ProjectSchema.index({ title: 'text', description: 'text', technologies: 'text' });
module.exports = mongoose.model('Project', ProjectSchema);