const prisma = require('../prisma');

const google = require('./googleStrategy');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');

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
    naver(passport);
};
