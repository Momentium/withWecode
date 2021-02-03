const prisma = require('../prisma')

const emailVeryfierCreate = (async(fields) => {
    const { auth_number, email } = fields
    return await prisma.email_auth.upsert({
        create: {
            email: email,
            auth_number: auth_number
        },
        update: {
            auth_number: auth_number

        },
        where: { email: email },
    })
})

const emailVerificationCodeCheck = (async(fields) => {
    const { authNum, email } = fields
    console.log("check2: ", { authNum, email })
    const find = await prisma.email_auth.findUnique({
        where: {
            email_auth_number: {
                email: email,
                auth_number: authNum
            }
        }
    })
    if (find) { return true }
})

module.exports = {
    emailVeryfierCreate,
    emailVerificationCodeCheck,
}