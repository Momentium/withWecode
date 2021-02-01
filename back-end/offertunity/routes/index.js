const express = require('express')

const passport = require('passport')
const bcrypt = require('bcrypt');

const router = express.Router()
const UserRouter = require('./UserRouter')
const ProjectRouter = require('./ProjectRouter')
const InitialRouter  = require('./InitialRouter')

router.use('/users', UserRouter)
router.use('/projects', ProjectRouter)
router.use('/initials', InitialRouter)

module.exports = router
