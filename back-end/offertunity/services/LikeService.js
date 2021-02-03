const prisma = require('../prisma')

const like = (async(table, where, data) => {
    const likeInfo = await prisma[table].findFirst({ where })
    if (!likeInfo) {
        data.is_liked = true
        return prisma[table].create({ data })
    } else if (!likeInfo.is_liked) {
        data = { is_liked: true }
        return prisma[table].update({
            where: { id: likeInfo.id },
            data
        })
    } else if (likeInfo.is_liked) {
        data = { is_liked: false }
        return prisma[table].update({
            where: { id: likeInfo.id },
            data
        })
    }
})

const findIsLiked = async(table, userId, objectId) => {
    const where = {}
    if (table === 'project_likes') {
        where.user_id = userId,
            where.project_id = Number(objectId)
    } else if (table === 'startup_likes' || table === 'partner_likes') {
        where.user_id = userId,
            where.company_id = Number(objectId)
    } else {
        errorGenerator({ statusCode: 400, message: 'Unknown Like Object' })
    }

    return prisma[table].findFirst({
        where
    })
}

module.exports = {
    like,
    findIsLiked
}