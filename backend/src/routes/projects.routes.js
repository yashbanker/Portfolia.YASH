const router = require('express').Router();
const ctrl = require('../controllers/projects.controller');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/', ctrl.list);
router.get('/:slug', ctrl.getOne);
router.post('/', protect, adminOnly, ctrl.create);
router.put('/:id', protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.remove);
module.exports = router;