const express = require('express')
const passport = require('passport')
const router = express.Router()
const { body } = require('express-validator')

const { UserController } = require('../controllers')

router.post(
    '/signup',
    body('email').isEmail(),
    body('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    UserController.signUp
)

router.post(
    '/signin',
    body('email').isEmail(),
    body('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    UserController.signIn
)


router.get('/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});

module.exports = router