const router = require('express').Router();
const Skill = require('../models/Skill');
const { protect, adminOnly } = require('../middleware/auth');
const crud = require('../controllers/generic.controller').makeCrud(Skill);
router.get('/', crud.list); router.get('/:id', crud.getOne);
router.post('/', protect, adminOnly, crud.create);
router.put('/:id', protect, adminOnly, crud.update);
router.delete('/:id', protect, adminOnly, crud.remove);
module.exports = router;