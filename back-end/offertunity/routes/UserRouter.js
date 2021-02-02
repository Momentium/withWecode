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

//naver

router.get("/naver", passport.authenticate("naver"));

router.get("/naver/callback", function (req, res, next) {
  passport.authenticate("naver", function (err, user) {
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      console.log("naver/callback user : ", user);
      return res.redirect("/");
    });
  })(req, res);
});

//google

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users",
  }),
  (req, res) => {
    res.redirect("/users/signin");
  }
);

//kakao

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
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
