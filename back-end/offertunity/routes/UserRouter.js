const express = require('express')
const router = express.Router()
const {body} = require('express-validator')

const { UserController} = require('../controllers')
console.log("please3")
router.post(
  '/logIn',
  body('email').isEmail(),
  body('password').isLength({min:5}),
  UserController.logIn
)

router.post(
  '/signUp',
  body('email').isEmail(),
  body('password').isLength({min:5}),
  UserController.signUp
)

function isLoggedIn(req, res, next) {
  if(!req.isAuthenticated()){
    return next();
  } else {
    res.redicrect('/');
  }
}


//네이버로그인
const passport = require('passport')

router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', function (req, res, next) {
  passport.authenticate('naver', function (err, user) {
    console.log('passport.authenticate(naver)실행');
    if (!user) { return res.redirect("/"); }
    req.logIn(user, function (err) { 
       console.log('naver/callback user : ', user);
       return res.redirect("/success");        
    });
  })(req, res);
});

module.exports = router;
