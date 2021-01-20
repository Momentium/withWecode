const google = require('./googleStrategy');
const kakao = require('./kakaoStrategy');
const prisma = require('../prisma');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        prisma.users.findUnique({where: {id}})
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    google(passport);
    kakao(passport);
};