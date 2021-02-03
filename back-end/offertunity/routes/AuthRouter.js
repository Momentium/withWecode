const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const { AuthController } = require('../controllers')

router.post(
    '/email',
    body('email').isEmail(),
    AuthController.email
)

router.post(
    '/emailconfirm',
    AuthController.emailVerification
)
module.exports = router;