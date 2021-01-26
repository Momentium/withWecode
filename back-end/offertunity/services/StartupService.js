const { upsertConnection } = require('../utils')
const prisma = require('../prisma')

const createCompany = (async (user_id, compnay_fields) => {
    
})

const existMember = (async (id, company_id) => {
    const userExists = await prisma.$exists.company_members({
        id
    });
})

const createMember = (async (companyId, members) => {
    members.companies = {connect: {id: companyId}};
    await prisma.company_members.create({
        data: members
    })
})

const deleteMember = (async (memberId) => {
    console.log('del')
    await prisma.company_members.delete({
        where: {id: memberId}
    })
})

const createStartup = (async (user_id, fields) => {
    const {company, startup, partner, wishInvestmentSeries, investedFrom, companyNewsURL, startupImgs, members} = fields

    const company_info = await prisma.companies.create({ data: company })

    await prisma.users.update({where: {id: user_id}, data: {companies: {connect: {id: company_info.id}}}})

    startup.companies = {connect: {id: company_info.id}}
    const startup_info = await prisma.startup_infos.create( {data: startup} )

    if (startup && wishInvestmentSeries) {
        for (len=0; len<wishInvestmentSeries.length; len++) {
            wishInvestmentSeries[len].startup_infos = {connect: {id: startup_info.id}}
            await prisma.wish_investment_series.create( { data:wishInvestmentSeries[len] } )
        }
    }

    if (members) {
        for (len=0; len<members.length; len++) {
            createMember(company_info.id, members[len])
        }
    }
    return {...company_info, ...startup_info}
})

const editStartup = (async (companyId, fields) => {
    const {company, startup, partner, wishInvestmentSeries, investedFrom, companyNewsURL, startupImgs, members, delMembers} = fields
    const company_info = await prisma.companies.update({
        where: {id: companyId},
        data: company
    })

    const old_startup_info = await prisma.startup_infos.findUnique({
        where: {company_id: companyId}
    })

    const startup_info = await prisma.startup_infos.update({
        where: {company_id: companyId},
        data:
        {
            ...startup,
            ...upsertConnection('technologies', old_startup_info.core_technology_id, startup.technologies),
            ...upsertConnection('sectors', old_startup_info.sector_id, startup.sectors),
            ...upsertConnection('investment_funds', old_startup_info.investment_fund_id, startup.investment_funds),
            ...upsertConnection('investment_series', old_startup_info.investment_series_id, startup.investment_series)
        }
    })

    if (delMembers) {
        for (len=0; len<delMembers.length; len++) {
            console.log(delMembers[len])
            deleteMember(delMembers[len])
        }
    };

    if (members) {
        for (len=0; len<members.length; len++) {
            await createMember(company_info.id, members[len])
        }
    }

    return {...company_info, ...startup_info}
})

module.exports = {
    createStartup,
    editStartup,
    existMember
}