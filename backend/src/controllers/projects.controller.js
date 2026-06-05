const Project = require('../models/Project');
const slugify = (str) => str.toString().toLowerCase().trim().replace(/[^\u4e00-\u9fa5a-zA-Z0-9\u3040-\u30ff\uac00-\ud7af0-9s-]/g, '').replace(/\u0020+/g, '-').replace(/--+/g, '-');

exports.list = async (req, res, next) => {
  try {
    const { category, q, featured, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (q) filter.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 }).skip(skip).limit(Number(limit)),
      Project.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) } });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) data.slug = slugify(data.title);
    const project = await Project.create(data);
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.title && !data.slug) data.slug = slugify(data.title);
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};