const { createError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const idGenerate = require('bson-objectid');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, 'Email is use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = idGenerate;

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}>Click to confirm your email</a>`,
  };

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });

  await sendMail(mail);
};

module.exports = register;
