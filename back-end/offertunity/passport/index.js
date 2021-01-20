const kakao = require('./kakaoStrategy');
const prisma = require('../prisma');
const { users } = require('../prisma');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        users.find({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    kakao(passport);
};