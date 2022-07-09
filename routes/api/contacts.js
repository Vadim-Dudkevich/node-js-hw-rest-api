const express = require('express');
const { validation, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact.js');

const contact = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(contact.getAll));

router.get('/:id', authenticate, ctrlWrapper(contact.getById));

// router.post('/', validation(schemas.add), ctrlWrapper(contact.add));
router.post('/', authenticate, ctrlWrapper(contact.add));

router.delete('/:id', authenticate, ctrlWrapper(contact.removeById));

router.put('/:id', authenticate, ctrlWrapper(contact.updateById));
// router.put(
//   '/:id',
//   validation(schemas.add),
//   ctrlWrapper(contact.updateById)
// );

router.patch(
  '/:id/favorite',
  authenticate,
  validation(schemas.updateFavorite),
  ctrlWrapper(contact.updateFavorite)
);

module.exports = router;
