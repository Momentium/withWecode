const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const { UserService } = require('../services')
const prisma = require('../prisma')

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `https://api.offertunity.kr/auths/google/callback`,
        // callbackURL: "http://10.0.1.29:3000/auths/google/callback",
        scope: ['profile', 'email'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await prisma.users.findUnique({ where: {sns_id: profile.id} });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await UserService.createUser({
                    sns_id: profile.id,
                    email: profile._json.email,
                    name: profile.displayName,
                    signup_methods: {connect: {id: 2}}
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};