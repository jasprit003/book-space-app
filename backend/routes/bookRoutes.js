const express = require('express');
const { searchBooks } = require('../controllers/BookController');

const router = express.Router();

router.get('/search', searchBooks);

module.exports = router;
