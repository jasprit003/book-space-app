const express = require('express');
const { addShelf } = require('../controllers/shelvesController');

const router = express.Router();

// router.get('/', viewCollection);
router.post('/', addShelf);

module.exports = router;
