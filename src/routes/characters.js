const express = require('express');
const { body, validationResult } = require('express-validator');

const characterController = require('../controllers/characters');
const router = require('./user');

router.post(
  '/',
  [
    body('image').notEmpty().isString().withMessage('image missing'),
    body('name').notEmpty().isString().withMessage('name missing'),
    body('age')
      .notEmpty()
      .custom((value) => {
        if (+value <= 0 || +value % 1 != 0) {
          throw new Error('age must be a positive integer or null');
        }
        return true;
      }),
    body('weight')
      .notEmpty()
      .custom((value) => {
        if (value <= 0) {
          throw new Error('weight must be a positivie number');
        }
        return true;
      }),
    body('history').notEmpty().isString(),
    body('movies')
      .isArray()
      .withMessage(
        'movies must be an empty array or contain numeric movies ids'
      ),
    body('movies.*')
      .isNumeric()
      .toInt()
      .withMessage('movies must contain numeric ids or be empty'),
  ],
  characterController.create
);

router.get('/', characterController.getAll);

router.use('/:character_id', characterController.fetch);

router.get('/:character_id', characterController.getOne);

router.put(
  '/characters/:character_id',
  [
    body('age').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (+value <= 0 || +value % 1 != 0) {
        throw new Error('age must be a positive integer or null');
      }
      return true;
    }),
    body('weight').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (value <= 0) {
        throw new Error('weight must be a positivie number');
      }
      return true;
    }),
    body('movies').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (!Array.isArray(value)) {
        throw new Error('movies must be an array');
      }
      return true;
    }),
  ],
  characterController.edit
);

router.delete('/:character_id', characterController.deleteOne);

module.exports = router;
