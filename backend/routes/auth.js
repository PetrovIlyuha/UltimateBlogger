const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.get("/signout", signout);
router.post("/signin", userSigninValidator, runValidation, signin);
// test for protected routes
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "Yout have accessed protected, secret page"
  });
});
module.exports = router;
