const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validation, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user.js');
const ctrl = require('../../controllers/auth');
const router = express.Router();

// ! ============= signUp
router.post(
  '/register',
  validation(schemas.register),
  ctrlWrapper(ctrl.register)
);

// ! ============= signIn
router.post('/login', validation(schemas.login), ctrlWrapper(ctrl.login));

// ! ============= getCurrent
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

// ! ============= logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
