const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

// singup a user
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter a Valid Email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email already exists');
          }
        })
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

// login
router.post(
  '/login',
  authController.login
);

module.exports = router;