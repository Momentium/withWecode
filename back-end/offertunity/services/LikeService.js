const prisma = require('../prisma')
const { makeQueryOption } = require('../utils')

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

const findLikedStartups = async(query, userId) => {
    const { offset, limit, ...fields } = query
    const where = makeQueryOption(fields)

    const ARTICLES_DEFAULT_OFFSET = 0
    const ARTICLES_DEFAULT_LIMIT = limit ? limit : 6
    
    const likedStartups = await prisma.startup_likes.findMany({
        where: {
            user_id: userId,
            is_liked: true
        },
        include: {
            companies: {
                include: {
                    startups: true
                }
            }
        },
        skip: (Number(offset) - 1) * ARTICLES_DEFAULT_LIMIT || ARTICLES_DEFAULT_OFFSET,
        take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
        orderBy: {
            updated_at: 'desc'
        }
    })

    const num = (await prisma.startup_likes.findMany({
        where: {
            user_id: userId,
            is_liked: true
        }
    })).length

    return [likedStartups, num]
}

module.exports = {
    like,
    findIsLiked,
    findLikedStartups
}