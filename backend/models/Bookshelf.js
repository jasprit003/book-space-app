const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bookshelf', bookshelfSchema);
