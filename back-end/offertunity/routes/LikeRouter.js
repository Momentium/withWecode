const express = require('express')
const router = express.Router()

const { validateToken } = require('../middlewares')
const { CompanyController, ProjectController } = require('../controllers')

// startup like
router.post(
    '/startup/:companyId',
    validateToken,
    CompanyController.likeStartup
    )

// partner like
router.post(
    '/partner/:companyId',
    validateToken,
    CompanyController.likePartner
    )

// project like
router.post(
    '/project/:partnerId',
    validateToken,
    ProjectController.likeProject
)

module.exports = router