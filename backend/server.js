require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const bookshelvesRoutes = require('./routes/bookshelvesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.error('MongoDB connection failed'));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/bookshelves', bookshelvesRoutes);

app.listen(PORT, () =>
  console.log(`server up and running on http://localhost:${PORT}`)
);
