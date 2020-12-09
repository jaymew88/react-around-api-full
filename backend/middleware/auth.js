const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizeErr } = require('../errors/unauth-err');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizeErr('Authorization Required');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizeErr('Authorization Required');
  }
  req.user = payload;
  next();
}