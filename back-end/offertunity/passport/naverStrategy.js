var NaverStrategy = require("passport-naver").Strategy;
passport = require("passport");
const bcrypt = require("bcryptjs"); // 암호화를 위한 라이브러리
const { PrismaClient } = require("@prisma/client"); // prisma client
const { UserService } = require("../services");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient(); // prisma 인스턴스를 생성해서 앱 내에서 사용 합니다.

module.exports = (passport) => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const exUser = await prisma.users.findUnique({
            where: { email: profile.emails[0].value },
          });
          if (exUser) {
            console.log("logged in", accessToken);
            done(null, exUser);
          } else {
            const newUser = await UserService.createUser({
              email: profile._json.email,
              sns_id: profile._json.id,
              name: profile.displayName,
              user_types: { connect: { id: 1 } },
              signup_methods: { connect: { id: 2 } },
            });
            done(null, newUser);
            console.log("user created", accessToken);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
