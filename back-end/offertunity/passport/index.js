console.log("location: passport/index.js")

const passport = require('passport');
const naver = require('./naverStrategy');
const User = require('../prisma');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    naver(passport);
}
