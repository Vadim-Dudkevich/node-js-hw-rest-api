const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamp: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  contactAddSchema,
  updateFavorite,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
