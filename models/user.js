const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    email: {
      type: String,
      require: [true, 'Email is required'],
      match: emailRegExp,
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

const register = Joi.object({
  name: Joi.string().required(),
  subscription: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  token: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  register,
  login,
};

module.exports = {
  User,
  schemas,
};
