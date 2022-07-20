const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 2 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
      skip,
      limit: Number(limit),
    }).populate('owner', 'email subscription');

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
