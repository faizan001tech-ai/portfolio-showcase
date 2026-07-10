const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectController');
const protect = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
