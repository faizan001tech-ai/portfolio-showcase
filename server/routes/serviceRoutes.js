const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/serviceController');
const protect = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
