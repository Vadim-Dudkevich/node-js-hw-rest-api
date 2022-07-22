const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: SENDGRID_FROM_EMAIL };
  await sgMail.send(mail);
  return true;
};

module.exports = sendMail;

// const mail = {
//   to: SENDGRID_TO_EMAIL,
//   from: SENDGRID_FROM_EMAIL,
//   subject: 'New letter',
//   html: '<p>You have a new letter from Vadim Dudkevich.</p>',
// };

// sgMail
//   .send(mail)
//   .then(() => console.log('Mail send'))
//   .catch((error) => console.log(error.message));
