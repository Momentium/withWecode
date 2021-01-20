const express = require('express')
const passport = require('passport')
const router = express.Router()
const { body } = require('express-validator')

const { UserController } = require('../controllers')

//email

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

//naver

router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    if (!user) { return res.redirect("/"); }
    req.logIn(user, function (err) { 
       console.log('naver/callback user : ', user);
       return res.redirect("/success");        
    });
  })(req, res);
});

//google

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/users',
}), (req, res) => {
  res.redirect('/users/signin');
});

//kakao

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});

module.exports = router

