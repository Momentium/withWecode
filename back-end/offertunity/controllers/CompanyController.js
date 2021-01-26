const { createStartup, editStartup, existMember } = require('../services/StartupService')
const { errorWrapper, errorGenerator } = require('../errors')


const startupInfoTempSave = errorWrapper(async (req, res) => {
    if (!req.foundUser.type_id === 1) errorGenerator({statusCode: 400, message: 'this user is not startup user'})

    const { name, rep, establishedDate, sectorId, coreTechnologyId, homepage, description, itemDescription, investmentSeriesId, wishInvestmentSeriesIds, investmentFundId, investedFroms, teamIntro, memberCount, memberInfoNames, memberDelete, memberInfoPositions, companyNewsURLs } = req.body
    const { logoImg, startupImages, memberImages } = req.files
    const fields = {
        company: {
            name,
            logo_img: logoImg[0].location,
            established_date: establishedDate,
            homepage,
            description,
            team_intro: teamIntro,
            member_count: memberCount,
        },
        startup_connect: {
            sectors: { connect: {id: Number(sectorId)}},
            technologies: { connect: {id: Number(coreTechnologyId)}},
            investment_series: {connect: {id: Number(investmentSeriesId)}},
            investment_funds: {connect: {id: Number(investmentFundId)}}
        },
        startup_field: {
            rep,
            item_description: itemDescription,
        },
        wishInvestmentSeries: [],
        investedFrom: [],
        companyNewsURL: [],
        startupImgs: [],
        members: [],
        delMembers: [],
    }

    if (wishInvestmentSeriesIds) {
        for (len=0; len<wishInvestmentSeriesIds.length; len++) { 
            fields.wishInvestmentSeries.push({connect: {id: Number(wishInvestmentSeriesIds[len])}});
        }
    };

    if (memberDelete) {
        for (len=0; len<memberDelete.length; len++) {
            //console.log(existMember(memberDelete[len], req.foundUser.company_id))
            fields.delMembers.push(Number(memberDelete[len]))
    }};

    if (investedFroms) {
        for (len=0; len<investedFroms.length; len++) { 
            fields.companyNewsURL.push(investedFroms[len]);
        } 
    };

    if (companyNewsURLs) {
        for (len=0; len<companyNewsURLs.length; len++) { 
            fields.investedFrom.push(companyNewsURLs[len]);
        } 
    };

    if (memberInfoNames && memberInfoPositions && memberImages) {
        if (memberInfoNames.length === memberInfoPositions.length && memberInfoPositions.length === memberImages.length) {
            for (len=0; len<memberInfoNames.length; len++) {
                let members_temp = {name: memberInfoNames[len], position: memberInfoPositions[len], img: memberImages[len].location}
                fields.members.push(members_temp)
            } 
        } else if (typeof memberInfoNames === 'string' && typeof memberInfoPositions === 'string' && memberImages.length === 1) {
            let members_temp = {name: memberInfoNames, position: memberInfoPositions, img: memberImages}
            fields.members.push(members_temp)
        }
    };

    if (startupImages) {
        for (len=0; len<startupImages.length; len++) {
            fields.startupImgs.push(startupImages[len].location)
        } 
    };

    Object.keys(fields.company).forEach(key => fields.company[key] === undefined ? fields.company[key] = null : {});
    Object.keys(fields.startup_field).forEach(key => fields.startup_field[key] === undefined ? fields.startup_field[key] = null : {});
    Object.keys(fields.startup_connect).forEach(key => isNaN(fields.startup_connect[key].connect.id) ? fields.startup_connect[key] = undefined : {});

    fields.startup = {...fields.startup_connect, ...fields.startup_field}

    if (!req.foundUser.company_id) {
        const startupinfo = await createStartup(req.foundUser.id, fields)
    } else {
        const startupinfo = await editStartup(req.foundUser.company_id, fields)
    }
    await res.status(201).json({
        message: 'basic company info saved'
    })
});

const partnerInfoTempSave = errorWrapper(async (req, res) => {
    if (!req.foundUser.type_id === 2) errorGenerator({statusCode: 400, message: 'this user is not partner user'})


})

module.exports = {
    startupInfoTempSave,
    partnerInfoTempSave
}