const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const isValidId = (reg, res, next) => {
  const { id } = reg.params;
  const result = isValidObjectId(id);
  if (!result) {
    const error = createError(400, 'Invalid Id');
    return next(error);
  }
  next();
};

module.exports = isValidId;
