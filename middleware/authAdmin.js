const jwt = require('jsonwebtoken');
const config = require('config');
const { roleName } = require('../helpers/roleName');

module.exports = function (req, res, next) {
  if (!config.get('requiresAuth')) return next();

  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;

    if (req.user.role !== roleName.admin)
      return res
        .status(401)
        .send('Não tem permissão para concluir esta acção.');

    return next();
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
};
