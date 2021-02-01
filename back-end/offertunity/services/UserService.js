console.log('location: UserService')
const { signup_methods } = require('../prisma')
const prisma = require('../prisma')

const findCompany = (field) => {
    const [uniqueKey] = Object.keys(field)

    const isKeyId = uniqueKey === 'id'
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

    return prisma.companies.findUnique({ where: {[uniqueKey]: value}})
}

const createUser = (fields) => {
    return prisma.users.create({ data: fields })
}

const findUser = (field) => {
    const [uniqueKey] = Object.keys(field)

    const isKeyId = uniqueKey === 'id'
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]
    return prisma.users.findUnique({ where: { [uniqueKey]: value } })
}

const findUserType = (field) => {
    const [typeId] = Object.keys(field)
    const value = field[typeId]
    return prisma.user_types.findUnique({ where: { id: value } })
}

const findUserInfo = (field) => {
    const [uniqueKey] = Object.keys(field)
    const isKeyId = uniqueKey === 'id'
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]
    return prisma.users.findUnique({where: {[uniqueKey]: value} })
}

const updateInfo = (async (fields) => {
    const { userId, requestedFields, profile_picture } = fields
    console.log(profile_picture)    
    return prisma.users.update({
        where: {
            id: Number(userId),
        },
        data: {
            phone_number : requestedFields.phone_number,
            profile_picture
        }
        })
    })

const deleteMember = (field) => {
    const [uniqueKey] = Object.keys(field)
    const isKeyId = uniqueKey === 'id'
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

    return prisma.users.delete({
        where: {
            [uniqueKey]: value,
        }
    })
}

module.exports = {
    findCompany,
    createUser,
    findUser,
    findUserType,
    findUserInfo,
    updateInfo,
    deleteMember
}

