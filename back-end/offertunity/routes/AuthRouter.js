const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const { AuthController } = require('../controllers')

router.post(
    '/email',
    body('email').isEmail(),
    AuthController.email
)

router.get(
    '/emailconfirm',
    // body('email').isEmail(),
    // body('authNum'),
    AuthController.emailVerification
)

// router.post(
//     '/phone',
//     body('phone').isEmail(),
//     AuthController.phoneNumber,
// )


// router.post(
//     "/certifications",
//     AuthController.phoneNumber
// )

module.exports = router;