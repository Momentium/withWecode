const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares')
const { CompanyController, ProjectController } = require('../controllers')

// company like
router.get(
    '/company/:companyId',
    validateToken,
    CompanyController.likeCompany
    )

// project like
router.get(
    '/project/:partnerId',
    validateToken,
    ProjectController.likeProject
)

module.exports = router