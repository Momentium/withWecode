const express = require('express')
<<<<<<< HEAD

const passport = require('passport')
const bcrypt = require('bcrypt');

=======
>>>>>>> back-end
const router = express.Router()

const UserRouter = require('./UserRouter')
<<<<<<< HEAD
const ProjectRouter = require('./ProjectRouter')
const InitialRouter  = require('./InitialRouter')

router.use('/users', UserRouter)
router.use('/projects', ProjectRouter)
router.use('/initials', InitialRouter)
=======
const CompanyRouter  = require('./CompanyRouter')
const InitialRouter  = require('./InitialRouter')
const AuthRouter = require('./AuthRouter')
// const LikeRouter = require('./LikeRouter')

router.use('/users', UserRouter)
router.use('/companies', CompanyRouter)
router.use('/initials', InitialRouter)
router.use('/auths', AuthRouter)
// router.use('/like', LikeRouter)
>>>>>>> back-end

module.exports = router