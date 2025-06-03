const axios = require('axios');

async function searchBooks(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${q}`
    );

    if (response.status === 200) {
      const booksData =
        response.data.items?.map((book) => ({
          googleBookId: book?.id,
          title: book.volumeInfo?.title,
          authors: book.volumeInfo?.authors || [],
          publisher: book.volumeInfo?.publisher,
          publishedDate: book.volumeInfo?.publishedDate,
          description: book.volumeInfo?.description,
          pageCount: book.volumeInfo?.pageCount,
          categories: book.volumeInfo?.categories || [],
          thumbnail: book.volumeInfo?.imageLinks?.thumbnail || null,
          language: book.volumeInfo?.language,
          country: book.volumeInfo?.country,
        })) || [];

      res.json({ books: booksData, total: booksData.length });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { searchBooks };
