const bcrypt = require('bcryptjs');

const User = require('../models/User');
const auth = require('../middleware/auth');

const { generateToken } = require('../utils');

async function signIn(req, res) {
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
}

async function signUp(req, res) {
  const { username, password } = req.body || null;
  const salt = await bcrypt.genSalt(5);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const userExist = User.findOne(username);

    if (userExist) {
      return res.json({ message: 'user exists' });
    }

    const user = await User.create({
      username,
      passwordHash,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signIn, signUp };
