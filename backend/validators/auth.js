const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required..."),
  check("email")
    .isEmail()
    .withMessage("Email address is incorrect..."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password can't be shorter than 6 characters...")
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("Email address is incorrect..."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password can't be shorter than 6 characters...")
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email address is incorrect...")
];

exprorts.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password can't be shorter than 6 characters...")
];
