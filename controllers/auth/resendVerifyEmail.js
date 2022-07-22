const { User } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, 'User not found');
  }

  if (user.verify) {
    throw createError(400, 'Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Registration confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}>Click to confirm your email</a>`,
  };

  await sendMail(mail);
  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
