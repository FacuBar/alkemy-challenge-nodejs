const express = require('express');
const { body } = require('express-validator');

const usersController = require('../controllers/user');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').notEmpty().isString().isEmail().withMessage('email'),
    body('password').trim().notEmpty().isString(),
    body('password_confirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  usersController.register
);

router.post(
  '/login',
  [body('email').notEmpty().isEmail(), body('password').notEmpty()],
  usersController.login
);

module.exports = router;
