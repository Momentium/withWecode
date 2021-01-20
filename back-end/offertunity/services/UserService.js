const prisma = require('../prisma')

const createUser = (fields) => {
    return prisma.users.create({ data: fields })
}

const findUser = (field) => {
    const [uniqueKey] = Object.keys(field) //비구조화 배열 --> 'email'

    const isKeyId = uniqueKey === 'id' //재혁천재.
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

    return prisma.users.findUnique({ where: {[uniqueKey] : value}})
}

module.exports = {
    createUser,
    findUser
}