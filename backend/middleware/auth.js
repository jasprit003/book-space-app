const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { verifyToken } = require('../utils');

async function auth(req, res, next) {
  try {
    const token = req.headers.token || null;

    if (!token) {
      res.json({ message: 'no token specified' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.send('invalid signature, token has been tampererd');
    }

    const user = await User.findById(decoded.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).res.send('Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).res.send('error while reading token ');
  }
}

module.exports = auth;
