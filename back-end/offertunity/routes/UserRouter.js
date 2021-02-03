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
router.options("/mypage", cors());


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

router.get("/mypage", cors(), validateToken, UserController.showMemberInfo);

router.post(
  "/mypage",
  cors(), 
  validateToken,
  upload.single("profile_picture"),
  UserController.addMemberInfo
);

router.delete("/mypage", cors(), validateToken, UserController.deleteMember);

module.exports = router;
