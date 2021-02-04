const prisma = require('../prisma')

const createDatas = (async (table, datas) => {
    for (len=0; len<datas.length; len++) {
        await prisma[table].create({data: {
            name: datas[len]}
        })
    }
})

const createTerms = async (datas) => {
    for (len=0; len<datas.length; len++) {
        await prisma.terms.create( {data: datas[len]} )
    }
}

module.exports = {
    createDatas,
    createTerms
}