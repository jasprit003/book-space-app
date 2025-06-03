const Bookshelf = require('../models/Bookshelf');

async function addShelf(req, res) {
  const { title, description } = req.body;

  try {
    const shelfExist = await Bookshelf.findOne({ title: title });
    console.log('Body results: ' + title, description);

    if (shelfExist) {
      return res.json({ message: 'Shelf name already exists.', shelfExist });
    }

    const shelf = await Bookshelf.create({
      title,
      description,
    });

    res.json({ message: 'Shelf Added' }, shelf);
  } catch (error) {
    console.log(error);
    res.json({ message: 'error' });
  }
}

module.exports = { addShelf };
