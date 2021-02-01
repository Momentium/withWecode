const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const CompanyRouter  = require('./CompanyRouter')
const InitialRouter  = require('./InitialRouter')
// const LikeRouter = require('./LikeRouter')

router.use('/users', UserRouter)
router.use('/companies', CompanyRouter)
// router.use('/like', LikeRouter)
router.use('/initials', InitialRouter)

module.exports = router
