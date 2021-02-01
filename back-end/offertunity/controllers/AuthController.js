require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");
const { AuthService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const email = errorWrapper(async (req, res) => {
  const { email } = req.body;
  const authNum = await Math.random().toString().substr(2, 6);

  let transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
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
    subject: "Offertunity 회원가입을 위한 인증번호입니다.",
    text: authNum,
    html: `<b>${authNum}</b>`,
  });

  const emailVeriferSave = await AuthService.emailVeryfierCreate({
    email,
    auth_number: authNum,
  });

  res.status(201).json({
    message: "confirmation_code_sent to email",
    email: emailVeriferSave.email,
    auth_number: emailVeriferSave.auth_number,
  });
});

const emailVerification = errorWrapper(async (req, res) => {
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

// const emailVerification = errorWrapper(async(req, res) => {
//     const { authNum, email } = req.body
//     const foundCode = await AuthService.emailVerificationCodeCheck({ authNum, email })
//     if (!foundCode) errorGenerator({ statusCode: 400, message: 'client input invalid' })
//     const { id, authNum } = foundCode
//     const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)
//     if (!isValidPassword) errorGenerator({ statusCode: 400, message: 'client input invalid' })

//     res.status(200).json({ message: 'VerificationCode Confirmed!' })
// })

// const phoneNumber = async(request, response) => {
// const { imp_uid } = request.body; // request의 body에서 imp_uid 추출
// try {
//     // 인증 토큰 발급 받기
//     /* ...중략... */
//     // imp_uid로 인증 정보 조회
//     /* ...중략... */
//     const certificationsInfo = getCertifications.data.response; // 조회한 인증 정보
//     // unique_key: 개인식별 고유 키, unique_in_site: 사이트 별 개인식별 고유 키
//     const { unique_key, unique_in_site, name, gender, birth } = certificationsInfo;
//     ...
//     // 연령 제한 로직
//     if(new Date(birth).getFullYear() <= 1999) {
//             // 연령 만족
//         } else {
//             // 연령 미달
//         }
//         ...
//         // 1인 1계정 허용 로직
//         // DB에서 unique_key 조회 후 가입여부 검사
//     Users.find({ certificationKey: unique_key })
//         .then((user) => {
//             if (!user) {
//                 // 신규 고객
//             } else {
//                 // 이미 가입된 고객
//             }
//         });
// } catch (e) {
//     console.error(e);
// }
// });
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
    const token = jwt.sign({ id: user.social_id }, process.env.JWT_SECRET);
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
  email,
  emailVerification,
  // phoneNumber,
  // phoneNumberVerificatiton.
};
