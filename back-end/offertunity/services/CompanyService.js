const { upsertConnection } = require('../utils')
const prisma = require('../prisma')

const createCompany = (async(user_id, companyFields) => {
    const companyInfo = await prisma.companies.create({ data: companyFields })
    await prisma.users.update({ where: { id: user_id }, data: { companies: { connect: { id: companyInfo.id } } } })
    return companyInfo
})

const readCompany = (async(companyId) => {
    console.log(await prisma.companies.findUnique({ where: { id: companyId } }))
    return await prisma.companies.findUnique({ where: { id: companyId } })
})

const updateCompany = (async(companyId, companyFields) => {
    const companyInfo = await prisma.companies.update({
        where: { id: companyId },
        data: companyFields
    })
    return companyInfo
})

const createCompanyDetail = (async(companyId, table, fields) => {
    fields.companies = { connect: { id: companyId } }
    const startupInfo = await prisma[table].create({ data: fields })
    return startupInfo
})

const readCompanyDetail = (async(table, companyId) => {
    return await prisma[table].findUnique({ where: { company_id: companyId } })
})

const updateStartup = (async(companyId, startupFields) => {
    const startupInfo = await readStartup(companyId)
    const updatedStartupInfo = await prisma.startups.update({
        where: { id: startupInfo.id },
        data: {
            ...startupFields,
            ...upsertConnection('technologies', startupInfo.core_technology_id, startupFields.technologies),
            ...upsertConnection('sectors', startupInfo.sector_id, startupFields.sectors),
            ...upsertConnection('investment_funds', startupInfo.investment_fund_id, startupFields.investment_funds),
            ...upsertConnection('investment_series', startupInfo.investment_series_id, startupFields.investment_series)
        }
    })
    return updatedStartupInfo
})

const updatePartner = (async(companyId, partnerFields) => {
    const partnerInfo = await readStartup(companyId)
    const updatedStartupInfo = await prisma.startups.update({
        where: { id: startupInfo.id },
        data: {
            ...startupFields,
            ...upsertConnection('technologies', partnerInfo.core_technology_id, partnerFields.technologies),
            ...upsertConnection('investment_funds', partnerInfo.investment_fund_id, partnerFields.investment_funds),
        }
    })
    return updatedStartupInfo
})

const checkExistence = (async(table, data) => {
    if ((await prisma[table].findMany({ where: data })).length > 0) {
        return true;
    } else {
        return false;
    }
});

const checkWishInvestmentSeries = (async(startupId) => {
    return await prisma.wish_investment_series.findMany({ where: { startup_id: startupId } })
})

const createWishInvestmentSeries = (async(data) => {
    await prisma.wish_investment_series.create({
        data: data
    })
})

const updateWishInvestmentSeries = async(id, data) => {
    await prisma.wish_investment_series.update({
        where: { id: id },
        data: data
    })
}

const deleteWishInvestmentSeries = (async(id) => {
    await prisma.wish_investment_series.delete({
        where: { id }
    })
})

const createRelatedInfo = (async(table, data) => {
    await prisma[table].create({
        data: data
    })
})

const deleteRelatedInfo = (async(table, id) => {
    await prisma[table].delete({
        where: { id }
    })
})

const saveInfo = (async(companyId) => {
    console.log('hoi')
    await prisma.companies.update({
        where: { id: companyId },
        data: { is_saved: true }
    })
})


// IR 자료 등록현황
// IR 자료 등록의 주체는 스타트업만 가능
const irRegisteredCount = (async(field) => {
    companyId = Object.values(field)[0]
    return prisma.$queryRaw `select count(*) from company_documents where company_id = ${companyId} && type_id = 1;`
})

// 보낸 IR 자료 검토 요청
// 파트너가 스타트업에게 요청한 것을 보낸 경우 + 요청과 상관없이 자발적으로 보낸 경우
// 요청이와서 + 요청과 상관없이 보내기
// document_id 가 존재한다 = 자료를 보냈다

const irSentCount = (async(field) => {
    startupId = Object.values(field)[0]
    return prisma.$queryRaw `select count(*) from IR_requests where startup_id = ${startupId} && document_id is not null;`
})


// 받은 IR자료 요청 
// 파트너가 스타트업에게 IR자료 요청했는데 아직 미확인 상황

const irRequestedCount = (async(field) => {
    startupId = Object.values(field)[0]
    return prisma.$queryRaw `select count(*) from IR_requests where startup_id = ${startupId} && is_sent=1 && is_checked = 0;`
})


const readByDocType = (async(fields) => {
    const { companyId, docTypeId } = fields
    return await prisma.company_documents.findMany({ where: { comapny_id: companyId, type_id: docTypeId } })
})

// 문서 업로더
const registerDoc = (async(fields) => {
    const { companyId, docTypeId, startupDoc } = fields
    console.log({ companyId, docTypeId, startupDoc })

    return await prisma.company_documents.create({
        data: {
            companies: { connect: { id: parseInt(companyId) } },
            doc_url: startupDoc,
            document_types: { connect: { id: parseInt(docTypeId) } },
        }
    })
})

const deleteSDoc = (async(fields) => {
    const { company_id, doc_url, type_id } = fields
    return await prisma.company_documents.delete({
        where: {
            company_id: company_id,
            doc_url: doc_url,
            type_id: type_id,
        }
    })
})

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
    irRegisteredCount,
    irSentCount,
    irRequestedCount,
    // irListDetail,
    readByDocType,
    registerDoc,
    // downloadDoc,
    deleteSDoc

}