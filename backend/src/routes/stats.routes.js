const router = require('express').Router();
const { dashboard } = require('../controllers/stats.controller');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/dashboard', protect, adminOnly, dashboard);
module.exports = router;