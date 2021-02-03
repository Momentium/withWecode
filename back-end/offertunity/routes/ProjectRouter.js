<<<<<<< HEAD
=======
console.log('location: router/UserRouter')
>>>>>>> back-end
const express = require('express')
const passport = require('passport')
const router = express.Router()
const { body } = require('express-validator')
const upload = require('../utils/s3')
<<<<<<< HEAD
=======
const cors = require("cors");

router.options("/", cors());
>>>>>>> back-end

const { ProjectController } = require('../controllers')

const { validateToken } = require('../middlewares')

<<<<<<< HEAD
router.get('/', ProjectController.getProjects)
=======
router.get('/', cors(), ProjectController.getProjects)
>>>>>>> back-end
router.get('/:projectId', ProjectController.getOneProject)
router.post('/', validateToken, upload.single('project_picture'), ProjectController.postOneProject)
router.put('/:projectId', validateToken, upload.single('project_picture'), ProjectController.updateOneProject)
router.put('/publish/:projectId', validateToken, upload.single('project_picture'), ProjectController.openOneProject)
router.delete('/:projectId', validateToken, ProjectController.deleteOneProject)

module.exports = router