const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares')
const { CompanyController, ProjectController } = require('../controllers')

// company like
router.post(
    '/company/:companyId',
    validateToken,
    CompanyController.likeCompany
    )

// project like
router.post(
    '/project/:partnerId',
    validateToken,
    ProjectController.likeProject
)

module.exports = router