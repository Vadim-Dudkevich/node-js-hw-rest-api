const { Contact } = require('../../models/contact.js');
const { createError } = require('../../helpers');

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: 'Contact Deleted',
  });
};

module.exports = removeById;
