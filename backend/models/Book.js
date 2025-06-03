const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    googleBookId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: String,
    },
    isbn: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    pageCount: {
      type: Number,
      min: 0,
    },
    publisher: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      default: 'en',
      trim: true,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// bookSchema.index({ title: 'text', authors: 'text', categories: 'text' });

// // Virtual for displaying authors as a string
// bookSchema.virtual('authorsString').get(function () {
//   return this.authors.join(', ');
// });

// // Method to check if book has complete information
// bookSchema.methods.isComplete = function () {
//   return this.title && this.authors.length > 0 && this.googleBookId;
// };

module.exports = mongoose.model('Book', bookSchema);
