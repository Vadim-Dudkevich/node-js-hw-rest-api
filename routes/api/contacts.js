const express = require('express');
const { validation } = require('../../middlewares');
const { schemas } = require('../../models/contact.js');

const contact = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(contact.getAll));

router.get('/:id', ctrlWrapper(contact.getById));

// router.post('/', validation(schemas.add), ctrlWrapper(contact.add));
router.post('/', ctrlWrapper(contact.add));

router.delete('/:id', ctrlWrapper(contact.removeById));

router.put('/:id', ctrlWrapper(contact.updateById));
// router.put(
//   '/:id',
//   validation(schemas.add),
//   ctrlWrapper(contact.updateById)
// );

router.patch(
  '/:id/favorite',

  validation(schemas.updateFavorite),
  ctrlWrapper(contact.updateFavorite)
);

module.exports = router;
