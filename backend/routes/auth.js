const express = require("express");
const router = express.Router();
const {
  preSignup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  signup
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");

router.post("/pre-signup", userSignupValidator, runValidation, preSignup);
router.post("/signup", signup);
router.get("/signout", signout);
router.post("/signin", userSigninValidator, runValidation, signin);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

module.exports = router;
