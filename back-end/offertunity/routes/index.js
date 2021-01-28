const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const CompanyRouter = require('./CompanyRouter')
const InitialRouter = require('./InitialRouter')
const AuthRouter = require('./AuthRouter')

router.use('/users', UserRouter)
router.use('/companies', CompanyRouter)
router.use('/initials', InitialRouter)
router.use('/auths', AuthRouter)

module.exports = router