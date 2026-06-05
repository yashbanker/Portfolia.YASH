const mongoose = require('mongoose');
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  photo: { type: String, default: '' },
  feedback: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Testimonial', TestimonialSchema);