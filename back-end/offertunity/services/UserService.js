const prisma = require('../prisma')

const createUser = (fields) => {
    return prisma.users.create({ data: fields })
}

const findUser = (field) => {
    const [uniqueKey] = Object.keys(field)

    const isKeyId = uniqueKey === 'id'
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

    console.log({
        [uniqueKey]: value
    })

    return prisma.users.findUnique({
        where: {
            [uniqueKey]: value
        }
    })
}

const findUserType = (field) => {
    const [typeId] = Object.keys(field)
    const value = field[typeId]
    return prisma.user_types.findUnique({ where: { id: value } })
}

module.exports = {
    createUser,
    findUser,
    findUserType,
}