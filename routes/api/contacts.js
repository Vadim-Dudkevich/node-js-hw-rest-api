const express = require('express');
const Joi = require('joi');

const contacts = require('../../service/contacts.js');
const { createError } = require('../../helpers');

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

/*
1. Get all contacts (listContacts).
2. Get a contact by id (getContactById).
3. Add contact (addContact).
4. Update contact (updateContact).
5. Remove contact (removeContact).
*/

//* 1. Get all contacts (listContacts).
router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//* 2. Get a contact by id (getContactById).
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw createError(404);

      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;

      // res.status(404).json({
      //   message: 'Not found',
      // });
      // return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//* 3. Add contact (addContact).
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

//* 4. Update contact (updateContact).
router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      // throw createError(400, error.message);
      res.status(400).json({
        message: 'Missing Fields',
      });
      return;
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

//* Remove contact (removeContact).
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: 'Contact Deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
