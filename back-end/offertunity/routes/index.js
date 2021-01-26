const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const CompanyRouter  = require('./CompanyRouter')


router.use('/users', UserRouter)
router.use('/companies', CompanyRouter)

module.exports = router
