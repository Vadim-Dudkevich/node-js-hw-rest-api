const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validation, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user.js');
const ctrl = require('../../controllers/auth');
const router = express.Router();

//  ============= signUp
router.post(
  '/register',
  validation(schemas.register),
  ctrlWrapper(ctrl.register)
);

//  ============= sendEmail
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

//  ============= resendEmail
router.post(
  '/verify',
  validation(schemas.email),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

//  ============= signIn
router.post('/login', validation(schemas.login), ctrlWrapper(ctrl.login));

//  ============= getCurrent
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

//  ============= logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

//  ============= avatar
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
