const express = require('express')
const router = express.Router()
const upload = require('../utils/s3')
const { validateToken, save, checkLogIn } = require('../middlewares')
const { CompanyController } = require('../controllers')

// startup info

router.get(
    '/info/startup',
    validateToken,
    CompanyController.getStartupInfo
)

router.post(
    '/info/startup/temp',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}, 
        {name: 'thumbnail', maxCount: 1}, 
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.tempSaveStartupInfo
)

router.post(
    '/info/startup/save',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}, 
        {name: 'thumbnail', maxCount: 1}, 
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.tempSaveStartupInfo
)

router.post(
    '/info/startup/save',
    validateToken,
    save,
    upload.fields([
        {name: 'logoImg', maxCount: 1}, 
        {name: 'thumbnail', maxCount: 1}, 
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.tempSaveStartupInfo,
    CompanyController.saveStartupInfo
)

router.post(
    '/project_info/startup',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}
    ]),
    CompanyController.saveStartupSubmitInfo
)

// partner info
router.post(
    '/info/partner',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1},
        {name: 'portfolioImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.tempSavePartnerInfo
)

router.post(
    '/info/partner/save',
    validateToken,
    save,
    upload.fields([
        {name: 'logoImg', maxCount: 1},
        {name: 'portfolioImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.tempSavePartnerInfo,
    CompanyController.savePartnerInfo
)

router.get(
    '/list/startup',
    checkLogIn,
    CompanyController.getStartups
)

router.get(
    '/startup/:companyId',
    checkLogIn,
    CompanyController.getOnestartup
)

router.get(
    '/list/partner',
    checkLogIn,
    CompanyController.getPartners
)

router.get(
    '/partner/:companyId',
    checkLogIn,
    CompanyController.getOnePartner
)


module.exports = router
