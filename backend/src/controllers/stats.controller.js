const Project = require('../models/Project');
const ContactLead = require('../models/ContactLead');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');

exports.dashboard = async (_req, res, next) => {
  try {
    const [projects, leads, newLeads, testimonials, services, recentLeads] = await Promise.all([
      Project.countDocuments(), ContactLead.countDocuments(), ContactLead.countDocuments({ status: 'new' }),
      Testimonial.countDocuments(), Service.countDocuments(), ContactLead.find().sort({ createdAt: -1 }).limit(5),
    ]);
    res.json({ success: true, data: { counts: { projects, leads, newLeads, testimonials, services }, recentLeads } });
  } catch (err) { next(err); }
};