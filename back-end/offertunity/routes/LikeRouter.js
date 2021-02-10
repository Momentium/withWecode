const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares')
const { CompanyController, ProjectController, LikeController } = require('../controllers')

// company like
router.get(
    '/company/:companyId',
    validateToken,
    CompanyController.likeCompany
)

// project like
router.get(
    '/project/:projectId',
    validateToken,
    ProjectController.likeProject
)

// Startup like 조회
router.get(
    '/startup',
    validateToken,
    LikeController.getLikeStartups
)

module.exports = router