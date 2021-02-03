const express = require('express')
const passport = require('passport')
const router = express.Router()
const { body } = require('express-validator')
const upload = require('../utils/s3')
const cors = require("cors");

router.options("/", cors());

const { ProjectController } = require('../controllers')

const { validateToken, checkLogIn } = require('../middlewares')

router.get('/', cors(), ProjectController.getProjects)
router.get('/:projectId', checkLogIn, ProjectController.getOneProject)
router.post('/', validateToken, upload.single('project_picture'), ProjectController.postOneProject)
router.put('/:projectId', validateToken, upload.single('project_picture'), ProjectController.updateOneProject)
router.put('/publish/:projectId', validateToken, upload.single('project_picture'), ProjectController.openOneProject)
router.delete('/:projectId', validateToken, ProjectController.deleteOneProject)


module.exports = router