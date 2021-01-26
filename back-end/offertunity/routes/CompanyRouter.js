const express = require('express')
const router = express.Router()
const upload = require('../utils/s3')
const { validateToken } = require('../middlewares')
const { CompanyController } = require('../controllers')

router.post(
    '/basic_info/startup',
    validateToken,
    upload.fields([
        {name: 'logoImg', maxCount: 1}, 
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.startupInfoTempSave
)

router.post(
    '/basic_info/partner',
    validateToken,
    upload.fields([
        {name: 'startupImages', maxCount: 5},
        {name: 'memberImages', maxCount: 100},
    ]),
    CompanyController.partnerInfoTempSave
)

// router.get(
//     '/',
//     CompanyController.startup
// )

module.exports = router
