const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const CompanyRouter  = require('./CompanyRouter')
const InitialRouter  = require('./InitialRouter')
const AuthRouter = require('./AuthRouter')
// const LikeRouter = require('./LikeRouter')

router.use('/users', UserRouter)
router.use('/companies', CompanyRouter)
router.use('/initials', InitialRouter)
router.use('/auths', AuthRouter)
// router.use('/like', LikeRouter)

module.exports = router