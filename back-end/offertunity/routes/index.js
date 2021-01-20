const express = require('express')

const passport = require('passport')
const bcrypt = require('bcrypt');

const KakaoStrategy = require('passport-kakao').Strategy;

const router = express.Router()
const UserRouter = require('./UserRouter')

router.use('/users', UserRouter)

module.exports = router
