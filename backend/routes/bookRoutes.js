const express = require('express');
const { searchBooks, addBook } = require('../controllers/BookController');

const router = express.Router();

router.get('/search', searchBooks);
router.post('/', addBook);

module.exports = router;
