const router = require('express').Router();
const Testimonial = require('../models/Testimonial');
const { protect, adminOnly } = require('../middleware/auth');
const crud = require('../controllers/generic.controller').makeCrud(Testimonial);
router.get('/', crud.list); router.get('/:id', crud.getOne);
router.post('/', protect, adminOnly, crud.create);
router.put('/:id', protect, adminOnly, crud.update);
router.delete('/:id', protect, adminOnly, crud.remove);
module.exports = router;