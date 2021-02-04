require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");
const { AuthService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const email = errorWrapper(async(req, res) => {
    const { email } = req.body
    const authNum = await Math.random().toString().substr(2, 6);

    let transporter = await nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    let mailOptions = await transporter.sendMail({
        from: `"Offertunity" <${process.env.NODEMAILER_USER}>`,
        to: req.body.email,
        subject: 'Offertunity 회원가입을 위한 인증번호입니다.',
        text: authNum,
        html: `<b>${authNum}</b>`,
    });

    console.log("checkcheck: ", { authNum, email })

    const emailVeriferSave = await AuthService.emailVeryfierCreate({
        email,
        auth_number: authNum,
    });

    res.status(201).json({
        message: 'confirmation_code_sent to email',
        email: emailVeriferSave.email,
        auth_number: emailVeriferSave.auth_number,

    })
});

const emailVerification = errorWrapper(async(req, res) => {
    const { authNum, email } = req.body;
    console.log("check: ", { authNum, email });
    const foundCode = await AuthService.emailVerificationCodeCheck({
        authNum,
        email,
    });
    if (!foundCode)
        errorGenerator({ message: "invalidVerificationCode", statusCode: 403 });
    res.status(200).json({ message: "VerificationCode Confirmed!" });
});

const socialLoginResponse = (req, res, err, user) => {
    if (err) {
        return res.status(400);
    }
    if (!user) {
        return res.status(200).json({
            success: false,
        });
    }
    req.login(user, { session: false }, (err) => {
        if (err) {
            res.send(err);
        }
        const { id } = user;
        const token = jwt.sign({ id }, process.env.AUTH_TOKEN_SALT);
        console.log("usertoken: ", token);
        return res.status(200).json({ userToken: token, success: true });
    });
};

module.exports = {
    naver: {
        get: (req, res, next) => {
            passport.authenticate("naver")(req, res, next);
        },
        callback: {
            get: (req, res, next) => {
                passport.authenticate("naver", (err, user) =>
                    socialLoginResponse(req, res, err, user)
                )(req, res, next);
            },
        },
    },
    google: {
        get: (req, res, next) => {
            passport.authenticate("google")(req, res, next);
        },
        callback: {
            get: (req, res, next) => {
                passport.authenticate("google", (err, user) =>
                    socialLoginResponse(req, res, err, user)
                )(req, res, next);
            },
        },
    },
    kakao: {
        get: (req, res, next) => {
            passport.authenticate("kakao")(req, res, next);
        },
        callback: {
            get: (req, res, next) => {
                passport.authenticate("kakao", (err, user) =>
                    socialLoginResponse(req, res, err, user)
                )(req, res, next);
            },
        },
    },
    email,
    emailVerification,
};