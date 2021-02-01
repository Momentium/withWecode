require("dotenv").config();
const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')

const signUp = errorWrapper(async(req, res) => {
    const { email, name, password, typeId, signUpMethodId } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const foundUser = await UserService.findUser({ email })
    if (foundUser) {
        errorGenerator({ statusCode: 409, message: 'duplicated' })
        res.status(409).json({
            message: 'duplicated'        
        })
    }

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
    const { id, password: hashedPassword } = foundUser
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)
    if (!isValidPassword) errorGenerator({ statusCode: 400, message: 'client input invalid' })
    const token = jwt.sign({ id }, AUTH_TOKEN_SALT)
    res.status(200).json({ message: 'login success!', token })
})



const showMemberInfo = errorWrapper(async(req, res) => {
    const { id: userId } = req.foundUser
    const userInfo = await UserService.findUserInfo({ id: userId })
    res.status(200).json({ userInfo })

})

const addMemberInfo = errorWrapper(async(req, res) => {
    const { id: userId } = req.foundUser
    const requestedFields = req.body
    const profile_picture = req.file? req.file.location : null;
    const addInfo = await UserService.updateInfo({ userId, requestedFields, profile_picture })
    res.status(201).json({
        message: 'information successfully added'
    })
})

const deleteMember = errorWrapper(async(req, res) => {
    const { id: userId } = req.foundUser
    const deleteMemberInfo = await UserService.deleteMember({ id: userId})
    res.status(201).json({
        message: 'user successfully deleted'
    })
})


module.exports = {
    signIn,
    signUp,
    showMemberInfo,
    addMemberInfo,
    deleteMember
}