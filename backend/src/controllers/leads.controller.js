const ContactLead = require('../models/ContactLead');
const nodemailer = require('nodemailer');

const sendNotification = async (lead) => {
  if (!process.env.SMTP_HOST) return;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM, to: process.env.NOTIFY_EMAIL,
      subject: `New Lead: ${lead.name}`,
      html: `<div style='font-family:sans-serif'><h2>New Portfolio Lead</h2><table>${Object.entries(lead).filter(([k]) => !['_id','__v','notes'].includes(k)).map(([k,v]) => `<tr><td style='padding:8px'><b>${k}:</b></td><td>${v}</td></tr>`).join('')}</table></div>`,
    });
  } catch (err) { console.warn('Email failed:', err.message); }
};

exports.create = async (req, res, next) => {
  try {
    const lead = await ContactLead.create(req.body);
    sendNotification(lead);
    res.status(201).json({ success: true, message: 'Thank you! I will respond within 24 hours.', data: { id: lead._id } });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      ContactLead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      ContactLead.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) } });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const lead = await ContactLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const lead = await ContactLead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) { next(err); }
};