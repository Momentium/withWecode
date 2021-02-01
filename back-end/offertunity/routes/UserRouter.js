console.log("location: router/UserRouter");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { body } = require("express-validator");
const upload = require("../utils/s3");
const cors = require("cors");

const { UserController } = require("../controllers");

const { validateToken } = require("../middlewares");

router.options("/signup", cors());
router.options("/signin", cors());

//email

router.post(
  "/signup",
  cors(),
  body("email").isEmail(),
  body("password").matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  ),
  UserController.signUp
);

router.post(
  "/signin",
  cors(),
  body("email").isEmail(),
  body("password").matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  ),
  UserController.signIn
);

//mypage

router.get("/mypage", validateToken, UserController.showMemberInfo);

router.post(
  "/mypage",
  validateToken,
  upload.single("profile_picture"),
  UserController.addMemberInfo
);

router.delete("/mypage", validateToken, UserController.deleteMember);

module.exports = router;
