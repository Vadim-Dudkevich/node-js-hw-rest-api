const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { createError } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw createError(401, 'Not authorized 1');
    }
    console.log(authorization);
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw createError(401, 'Not authorized 2');
      }
      console.log(id);
      console.log(user);

      req.user = user;
      next();
    } catch (error) {
      throw createError(401, 'Not authorized 3');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
