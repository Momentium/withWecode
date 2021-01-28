const express = require('express')
const router = express.Router()
const upload = require('../utils/s3')
const { validateToken, save } = require('../middlewares')
const { CompanyController } = require('../controllers')

// startup info
router.post(
    '/info/startup',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}, 
        {name: 'thumbnail', maxCount: 1}, 
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.startupInfoTempSave
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
    CompanyController.startupInfoTempSave,
    CompanyController.startupInfoSave
)

router.post(
    '/project_info/startup',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}
    ]),
    CompanyController.startupProjectSubmitSave
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
    CompanyController.partnerInfoTempSave
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
    CompanyController.partnerInfoTempSave,
    CompanyController.partnerInfoSave
)

module.exports = router
