const express = require('express')
const router = express.Router()
const { InitialController } = require('../controllers')

router.post(
    '/data',
    InitialController.InitialDataSetting
    )

<<<<<<< HEAD
module.exports = router
=======
<<<<<<< HEAD
module.exports = router
=======
module.exports = router
>>>>>>> back-end
>>>>>>> feature/projectCRUD
