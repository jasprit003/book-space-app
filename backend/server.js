require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.error('MongoDB connection failed'));

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

app.listen(PORT, () =>
  console.log(`server up and running on http://localhost:${PORT}`)
);
