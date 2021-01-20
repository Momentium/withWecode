const express = require('express')
console.log('please')
const routes = require('./routes')
const logger = require('morgan')('dev')


const passport = require('passport'); 
const session = require('express-session')
const passportConfig = require('./passport');

const app = express()
passportConfig(passport); 

app.use(express.json())
app.use(logger)

app.use(passport.initialize()); 
app.use(passport.session());
app.use(routes)


// general error handler
app.use((err, req, res, next) => {
  const { statusCode, message } = err
  console.error(err)
  res.status(statusCode || 500).json({ message })
})


module.exports = app


