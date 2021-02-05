const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const prisma = require("../prisma");

module.exports = (passport) => {
    passport.use(
        new KakaoStrategy({
                clientID: process.env.KAKAO_ID,
                // callbackURL: "http://10.0.1.41:3000/auths/kakao/callback",
                callbackURL: "http://10.60.161.158:3000/auths/kakao/callback",
            },
            async(accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await prisma.users.findUnique({
                        where: { snsld: profile.id, provider: "kakao" },
                    });
                    if (exUser) {
                        console.log("logged_in:", accessToken);
                        done(null, exUser);
                    } else {
                        const newUser = await prisma.users.create({
                            email: profile._json && profile._json.account_email,
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
                }
            }
        )
    );
};