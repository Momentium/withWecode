const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { AuthController } = require("../controllers");

router.post("/email", body("email").isEmail(), AuthController.email);

router.get(
  "/emailconfirm",
  // body('email').isEmail(),
  // body('authNum'),
  AuthController.emailVerification
);

// router.post(
//     '/phone',
//     body('phone').isEmail(),
//     AuthController.phoneNumber,
// )

// router.post(
//     "/certifications",
//     AuthController.phoneNumber
// )

//naver

router.get("/naver", AuthController.naver.get);
router.get("/naver/callback", AuthController.naver.callback.get);

//google
// router.get("/google", AuthController.google.get);
// router.get("/google/callback", AuthController.google.callback.get);


// router.get("/google", passport.authenticate("google"));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/users",
//   }),
//   (req, res) => {
//     res.redirect("/users/signin");
//   }
// );

//kakao

router.get("/kakao", AuthController.kakao.get);
router.get("/kakao/callback", AuthController.kakao.callback.get);


// router.get("/kakao", passport.authenticate("kakao"));

// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", {
//     failureRedirect: "/",
//   }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

module.exports = router;
