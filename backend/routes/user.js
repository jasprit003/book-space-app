const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const auth = require('../middleware/auth');

const { generateToken } = require('../utils');

const router = express.Router();
router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body || null;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'No user found!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.json({ message: 'Incorrect Password!' });
    }

    const token = generateToken({ userId: user._id });

    res.json({
      token,
      user: { userId: user.user_id, username: user.username },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'something wrong with the server :(' });
  }
});

router.post('/sign-up', async (req, res) => {
  const { username, password } = req.body || null;
  const salt = await bcrypt.genSalt(5);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      passwordHash,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
