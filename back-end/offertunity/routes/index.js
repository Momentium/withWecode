const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
console.log('please2')

router.use('/users', UserRouter)

module.exports = router

