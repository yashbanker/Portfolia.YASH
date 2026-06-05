const mongoose = require('mongoose');

const ContactLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  budget: { type: String, default: '' },
  projectType: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ContactLead', ContactLeadSchema);