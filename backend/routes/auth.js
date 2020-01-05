const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");

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
// router.get("/secret", requireSignin, authMiddleware, (req, res) => {
//   res.json({
//     user: req.user
//   });
// });
module.exports = router;
