const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(id) {
  const token = jwt.sign(id, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
