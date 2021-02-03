console.log('location: app')
require("dotenv").config();
const { COOKIE_SECRET } = process.env

const express = require('express')
const routes = require('./routes')
const logger = require('morgan')('dev')
const passport = require('passport')
const session = require('express-session')
const passportConfig = require('./passport')
const app = express()
passportConfig(passport);

app.use(express.json())
app.use(logger)

const cors = require('cors')
app.use(cors())

app.use(session({
    secret: COOKIE_SECRET,
    cookieSession: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes)

// general error handler
// express가 구현된 방식.. err, req, res, next를 받도록 함
// error를 최종적으로 받는 부분


app.use((err, req, res, next) => {
    const { statusCode, message } = err
    console.error(err)
    res.status(statusCode || 500).json({ message })
})

module.exports = app;