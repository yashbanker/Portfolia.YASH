const mongoose = require('mongoose');
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'AI', 'Tools', 'Other'], default: 'Other' },
  level: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Skill', SkillSchema);