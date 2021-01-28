const prisma = require('../prisma')

const emailVeryfierCreate = (async(fields) => {
    const { auth_number, email } = fields
    const checker = await prisma.email_auth.findUnique({
        where: {
            email: email
        }
    })

    if (!checker) {
        return prisma.email_auth.create({
            data: {
                email: email,
                auth_number: auth_number
            }
        })
    } else {
        return prisma.email_auth.update({
            where: { email: email },
            data: { auth_number: auth_number }
        })
    }

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