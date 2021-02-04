const express = require('express')
const router = express.Router()
const upload = require('../utils/s3')
const { ProjectController } = require('../controllers')
const { validateToken, save, checkLogIn } = require('../middlewares')

router.get(
  '/published', 
  ProjectController.getPublishedProjects
  )

router.get(
  '/', 
  checkLogIn, 
  ProjectController.getMyProjects
  )

router.get(
  '/:projectId', 
  checkLogIn, 
  ProjectController.getOneProject
  )

router.post(
  '/basicinfo/temp', 
  validateToken, 
  upload.single('project_picture'), 
  ProjectController.tempSaveProjectBasicInfo
  )

router.post(
  '/allinfo/temp', 
  validateToken, 
  upload.single('project_picture'), 
  ProjectController.tempSaveProjectInfo
  )

router.post(
  '/allinfo/save/:projectId', 
  validateToken, 
  save, 
  upload.single('project_picture'),
  ProjectController.saveProjectInfo
  )

router.put(
  '/temp/:projectId', 
  validateToken, 
  upload.single('project_picture'), 
  ProjectController.updateOneProject
  )

router.put(
  '/publish/:projectId', 
  validateToken, 
  upload.single('project_picture'), 
  ProjectController.openOneProject
  )

router.delete(
  '/:projectId', 
  validateToken, 
  ProjectController.deleteOneProject
  )

module.exports = router