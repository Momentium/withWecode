const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')

const signUp = errorWrapper(async(req, res) => {
    const { email, name, password, typeId, signUpMethodId } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const foundUser = await UserService.findUser({ email })
    if (foundUser) errorGenerator({ statusCode: 409, message: 'duplicated' })

    const createdUser = await UserService.createUser({
        email,
        name,
        password: hashedPassword,
        user_types: { connect: { id: Number(typeId) } },
        signup_methods: { connect: { id: Number(signUpMethodId) } }
    })

    res.status(201).json({
        message: 'user created',
        email: createdUser.email,
    })
})

const signIn = errorWrapper(async(req, res) => {
    const { email, password: inputPassword } = req.body

    const foundUser = await UserService.findUser({ email })
    if (!foundUser) errorGenerator({ statusCode: 400, message: 'client input invalid' })
    console.log('hi2')
    const { id, password: hashedPassword } = foundUser
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)
    if (!isValidPassword) errorGenerator({ statusCode: 400, message: 'client input invalid' })
    console.log('hi')
    const token = jwt.sign({ id }, AUTH_TOKEN_SALT)
    res.status(200).json({ message: 'login success!', token })
})

module.exports = {
    signIn,
    signUp,
}