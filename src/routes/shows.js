const express = require('express');
const { body, validationResult } = require('express-validator');

const showsController = require('../controllers/shows');

const router = express.Router();

router.post(
  '/',
  [
    body('title').notEmpty().isString(),
    body('image').notEmpty().isString(),
    body('calification')
      .notEmpty()
      .custom((value) => {
        if (+value <= 1 && +value >= 5) {
          throw new Error('calification must be in the range [1,5]');
        }
        return true;
      }),
    body('release_date').notEmpty().isDate(),
  ],
  showsController.create
);

router.get('/', showsController.getAll);

router.use('/:movie_id', showsController.fetch);

router.get('/:movie_id', showsController.getOne);

router.put(
  '/:movie_id',
  [
    body('calification').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (+value <= 1 && +value >= 5) {
        throw new Error('calification must be in the range [1,5]');
      }
      return true;
    }),
    body('release_date').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (!Date.parse(value)) {
        throw new Error('invalid date');
      }
      return true;
    }),
    body('genres').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (!Array.isArray(value)) {
        throw new Error('genres must be an array');
      }
      return true;
    }),
    body('characters').custom((value) => {
      if (value == undefined) {
        return true;
      }
      if (!Array.isArray(value)) {
        throw new Error('characters must be an array');
      }
      return true;
    }),
  ],
  showsController.edit
);

router.delete('/:movie_id', showsController.deleteOne);

module.exports = router;
