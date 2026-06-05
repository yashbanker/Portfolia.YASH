const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'Code2' },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  category: { type: String, default: 'Development' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Service', ServiceSchema);