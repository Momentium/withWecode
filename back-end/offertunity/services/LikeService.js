const prisma = require('../prisma')

const like = (async(object, where, data) => {
    const likeInfo = await prisma[object].findFirst({ where })
    if (!likeInfo) {
        data.is_liked = true
        return await prisma[object].create({data})
    } else if (!likeInfo.is_liked) {
        data = {is_liked: true}
        return await prisma[object].update({
            where: {id: likeInfo.id},
            data
        })
    } else if (likeInfo.is_liked) {
        data = {is_liked: false}
        return await prisma[object].update({
            where: {id: likeInfo.id},
            data
        })
    }
})

module.exports = {
    like
}