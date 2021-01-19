const express = require('express')
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

module.exports = router
