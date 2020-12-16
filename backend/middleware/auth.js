const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizationErr = require('../errors/unauth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizationErr('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizationErr('Authorization Required');
  }
  req.user = payload;
  next();
};