require("dotenv").config();
const nodemailer = require('nodemailer');
const { AuthService } = require('../services')
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
    const { authNum, email } = req.body
    console.log("check: ", { authNum, email })
    const foundCode = await AuthService.emailVerificationCodeCheck({ authNum, email })
    if (!foundCode) errorGenerator({ message: 'invalidVerificationCode', statusCode: 403 })
    res.status(200).json({ message: 'VerificationCode Confirmed!' })
});

module.exports = {
    email,
    emailVerification,
}