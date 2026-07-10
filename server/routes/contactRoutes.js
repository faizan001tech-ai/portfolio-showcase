const express = require('express');
const router = express.Router();
const { create, getAll } = require('../controllers/contactController');
const protect = require('../middleware/auth');

router.post('/', create);
router.get('/', protect, getAll);

module.exports = router;
