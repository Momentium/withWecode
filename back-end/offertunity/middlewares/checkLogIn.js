const { errorWrapper, errorGenerator } = require('../errors')
const { UserService } = require('../services')
const { AUTH_TOKEN_SALT } = process.env
const jwt = require('jsonwebtoken')

const checkLogIn = errorWrapper(async(req, res, next) => {
    if (req.headers.authorization) {
        let token
        if (req.headers.authorization.includes(' ')) {
            [bearer, token] = req.headers.authorization.split(' ')
        } else {
            token = req.headers.authorization
        }
        const { id } = jwt.verify(token, AUTH_TOKEN_SALT)
        const foundUser = await UserService.findUser({ id })
        if (!foundUser) errorGenerator({ statusCode: 404, message: 'user not found' })
        req.loggedIn = true
        req.foundUser = foundUser
    } else if (!req.headers.authorization) {
        req.loggedIn = false
    }
    next()
})

module.exports = checkLogIn 