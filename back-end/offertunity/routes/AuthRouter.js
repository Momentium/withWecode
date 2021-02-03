const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { AuthController } = require("../controllers");

router.post("/email", body("email").isEmail(), AuthController.email);

router.post(
    '/emailconfirm',
    AuthController.emailVerification
)


router.get("/naver", AuthController.naver.get);
router.get("/naver/callback", AuthController.naver.callback.get);
router.get("/kakao", AuthController.kakao.get);
router.get("/kakao/callback", AuthController.kakao.callback.get);

module.exports = router;