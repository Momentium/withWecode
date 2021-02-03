<<<<<<< HEAD
const passport = require('passport');
const KakaoStrategy = require("passport-kakao").Strategy;

const { PrismaClient } = require("@prisma/client"); // prisma client
const { UserService } = require("../services");
const prisma = new PrismaClient(); // prisma 인스턴스를 생성해서 앱 내에서 사용 합니다.


const dotenv = require("dotenv");
dotenv.config();

module.exports = (passport) => {
    passport.use(
        new KakaoStrategy(
            {
        clientID: process.env.KAKAO_ID,
        clientSecret: null,
        callbackURL: "https://10.0.1.29:3000/auths/kakao/callback",
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            const exUser = await prisma.users.findUnique({ 
                where: { email: profile.emails[0].value }
            });
            if (exUser) {
                console.log("logged in:", exUser)
                return done(null, exUser);
            } else {
                const newUser = await UserService.createUser({
                    sns_id: profile.id,
                    name: profile.nickname,
                    signup_methods: { connect: { id: 2 } },
                });
                console.log("user created:", accessToken)
                return done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            return done(error);
=======
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const prisma = require("../prisma");

module.exports = (passport) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "http://localhost:3000/users/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await prisma.users.findUnique({
            where: { snsld: profile.id, provider: "kakao" },
          });
          if (exUser) {
            console.log("logged_in:", accessToken);
            done(null, exUser);
          } else {
            const newUser = await prisma.users.create({
              email: profile._json && profile._json.kaccount_email,
              name: profile.displayName,
              snsld: profile.id,
              provider: "kakao",
            });
            console.log("signed_up:", accessToken);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
>>>>>>> back-end
        }
      }
    )
  );
};
