const { upsertConnection } = require('../utils')
const prisma = require('../prisma')

const createCompany = (async (user_id, company_fields) => {
    const companyInfo = await prisma.companies.create({ data: company_fields })
    await prisma.users.update({where: {id: user_id}, data: {companies: {connect: {id: companyInfo.id}}}})
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

const createStartup = (async (company_id, startup_fields) => {
    startup_fields.companies = {connect: {id: company_id}}
    const startupInfo = await prisma.startups.create({ data: startup_fields })
    return startupInfo
})

const readStartup = (async (companyId) => {
    return await prisma.startups.findUnique({where: {company_id: companyId}})
})

const updateStartup = (async (companyId, startupFields) => {
    const startupInfo = await readStartup(companyId)
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

const checkExistence = (async (table, data) => {
    if ((await prisma[table].findMany({ where: data })).length > 0) {
        return true;
    } else {
        return false;
    }
});

const createMember = (async (companyId, members) => {
    members.companies = {connect: {id: companyId}};
    await prisma.company_members.create({
        data: members
    })
})

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

module.exports = {
    createCompany,
    updateCompany,
    readCompany,
    createStartup,
    updateStartup,
    readStartup,
    checkExistence,
    checkWishInvestmentSeries,
    createWishInvestmentSeries,
    updateWishInvestmentSeries,
    deleteWishInvestmentSeries,
    createRelatedInfo,
    deleteRelatedInfo
}