const { upsertConnection, makeQueryOption } = require('../utils')
const prisma = require('../prisma')

const createCompany = (async (userId, companyFields) => {
    const companyInfo = await prisma.companies.create({ data: companyFields })
    await prisma.users.update({where: {id: userId}, data: {companies: {connect: {id: companyInfo.id}}}})
    return companyInfo
})

const readCompany = (async (companyId) => {
    console.log(await prisma.companies.findUnique( {where: {id: companyId}} ))
    return await prisma.companies.findUnique( {where: {id: companyId}} )
})

const updateCompany = (async (companyId, companyFields) => {
    const companyInfo = await prisma.companies.update({
        where: {id: companyId},
        data: companyFields
    })
    return companyInfo
})

const createCompanyDetail = (async (companyId, table, fields) => {
    fields.companies = {connect: {id: companyId}}
    return await prisma[table].create({ data: fields })
})

const readCompanyDetail = (async (table, companyId) => {
    return await prisma[table].findUnique({where: {company_id: companyId}})
})

const updateStartup = (async (companyId, startupFields) => {
    const startupInfo = await readCompanyDetail('startups', companyId)
    const updatedStartupInfo = await prisma.startups.update({
        where: {id: startupInfo.id},
        data:
        {
            ...startupFields,
            ...upsertConnection('technologies', startupInfo.core_technology_id, startupFields.technologies),
            ...upsertConnection('sectors', startupInfo.sector_id, startupFields.sectors),
            ...upsertConnection('investment_funds', startupInfo.investment_fund_id, startupFields.investment_funds),
            ...upsertConnection('investment_series', startupInfo.investment_series_id, startupFields.investment_series)
        }
    })
    return updatedStartupInfo
})

const updatePartner = (async (companyId, partnerFields) => {
    const partnerInfo = await readCompanyDetail('partners', companyId)
    console.log(partnerInfo)
    const updatedStartupInfo = await prisma.partners.update({
        where: {id: partnerInfo.id},
        data:
        {
            ...partnerFields,
            ...upsertConnection('technologies', partnerInfo.core_technology_id, partnerFields.technologies),
            ...upsertConnection('investment_funds', partnerInfo.investment_fund_id, partnerFields.investment_funds),
        }
    })
    return updatedStartupInfo
})

const checkExistence = (async (table, data) => {
    if ((await prisma[table].findMany({ where: data })).length > 0) {
        return true;
    } else {
        return false;
    }
});

const checkWishInvestmentSeries = (async (startupId) => {
    return await prisma.wish_investment_series.findMany({ where: {startup_id: startupId} })
})

const createWishInvestmentSeries = (async (data) => {
    await prisma.wish_investment_series.create({
        data: data
    })
})

const updateWishInvestmentSeries = async (id, data) => {
    await prisma.wish_investment_series.update({
        where: {id: id},
        data: data
    })
}

const deleteWishInvestmentSeries = (async (id) => {
    await prisma.wish_investment_series.delete({
        where: {id}
    })
})

const createRelatedInfo = (async (table, data) => {
    await prisma[table].create({
        data: data
    })
})

const deleteRelatedInfo = (async (table, id) => {
    await prisma[table].delete({
        where: {id}
    })
})

const saveInfo = (async (companyId) => {
    console.log('hoi')
    await prisma.companies.update({
        where: {id: companyId},
        data: {is_saved: true}
    })
})

const ARTICLES_DEFAULT_OFFSET = 0
const ARTICLES_DEFAULT_LIMIT = 5

const findStartups = (query) => {
    const { offset, limit, ...fields } = query
    const where = makeQueryOption(fields)
  
    return prisma.companies.findMany({
        include: {
            startups: true,
        },
        where,
        skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
        take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    })
}

const findPartners = (query) => {
    const { offset, limit, ...fields } = query
    const where = makeQueryOption(fields)
  
    return prisma.companies.findMany({
        include: {
            partners: true,
        },
        where,
        skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
        take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    })
}

module.exports = {
    createCompany,
    updateCompany,
    readCompany,
    createCompanyDetail,
    updateStartup,
    updatePartner,
    readCompanyDetail,
    checkExistence,
    checkWishInvestmentSeries,
    createWishInvestmentSeries,
    updateWishInvestmentSeries,
    deleteWishInvestmentSeries,
    createRelatedInfo,
    deleteRelatedInfo,
    saveInfo,
    findStartups,
    findPartners
}