const { CompanyService, UserService, LikeService } = require('../services')

const { typeChecker, lengthChecker, dateForm } = require('../utils')
const { errorWrapper, errorGenerator } = require('../errors');

const deleteMember = errorWrapper(async(req, res) => {
    const { memberId } = req.params
    const member = await CompanyService.readRelatedInfo('company_members', Number(memberId))
    if (!member) errorGenerator({ statusCode: 400, message: 'Unrecognized Member' })
    if (req.foundUser.company_id === member.company_id) {
        await CompanyService.deleteRelatedInfo('company_members', Number(memberId))
        await res.status(201).json({
            message: 'member deleted'
        })
    } else {
        errorGenerator({ statusCode: 400, message: 'this member is not belonged to this company' })
    }
})

const deleteInvestFrom = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const { investedFromId } = req.params
    CompanyService.deleteRelatedInfo('invested_from', Number(investedFromId))
    await res.status(201).json({
        message: 'investment info deleted'
    })
})

const deleteInvestTo = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 1) errorGenerator({ statusCode: 400, message: 'this user is not partner user' })
    const { investedToId } = req.params
    CompanyService.deleteRelatedInfo('invested_to', Number(investedToId))
    await res.status(201).json({
        message: 'investment info deleted'
    })
})

const deleteImage = errorWrapper(async(req, res) => {
    const { imageId } = req.params
    if (req.foundUser.type_id === 1) {
        CompanyService.deleteRelatedInfo('startup_images', Number(imageId))
    } else if (req.foundUser.type_id === 2) {
        CompanyService.deleteRelatedInfo('investment_portfolio', Number(imageId))
    }
})

const deleteNews = errorWrapper(async(req, res) => {
    const { newsId } = req.params
    const news = await CompanyService.readRelatedInfo('company_news', Number(newsId))

    if (req.foundUser.company_id === news.company_id) {
        await CompanyService.deleteRelatedInfo('company_news', Number(memberId))
        await res.status(201).json({
            message: 'news deleted'
        })
    } else {
        errorGenerator({ statusCode: 400, message: 'this news is not belonged to this company' })
    }
})


const getStartupInfo = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const body = {}
    if (req.foundUser.company_id) {
        const companyId = req.foundUser.company_id;
        const company = await CompanyService.findStartup({ id: companyId });

        body.name = company.name;
        body.rep = company.startups[0].rep;
        body.establishedDate = company.established_date;
        body.sector = company.startups[0].sector_id ? await CompanyService.findInfoName('sectors', company.startups[0].sector_id) : null;
        body.coreTechnology = company.startups[0].core_technology_id ? await CompanyService.findInfoName('technologies', company.startups[0].core_technology_id) : null;
        body.homepage = company.homepage;
        body.description = company.description;
        body.itemDescription = company.startups[0].item_description;
        if (company.startups[0].investment_series_id && !(company.startups[0].wish_investment_series === []) && company.startups[0].investment_fund_id) {
            body.investmentSeries = company.startups[0].investment_series_id ? await CompanyService.findInfoName('investment_series', company.startups[0].investment_series_id) : null;
            body.wishInvestmentSeriesIds = [];
            for (len = 0; len < company.startups[0].wish_investment_series.length; len++) {
                body.wishInvestmentSeriesIds.push(await CompanyService.findInfoName('investment_series', company.startups[0].wish_investment_series[len].investment_series_id))
            };
            body.investmentFundId = await CompanyService.findInfoName('investment_funds', company.startups[0].investment_fund_id);
        };
        body.teamIntro = company.team_intro;
        body.memberCount = company.member_count;
        body.members = company.company_members
        body.news = company.company_news
        body.investedFrom = company.startups[0].invested_from
        if (!body.investedFrom.length === 0) {
            for (len = 0; len < body.investedFrom.length; len++) {
                body.investedFrom[len].invested_fund = await CompanyService.findInfoName('investment_funds', body.investedFrom[len].invested_fund_id);
                body.investedFrom[len].investment_series = await CompanyService.findInfoName('investment_series', body.investedFrom[len].invested_series_id);
            }
        }
        body.images = company.startups[0].startup_images
        body.logoImg = company.logo_img;
        body.thumbnail = company.startups[0].thumbnail
    } else if (!req.foundUser.company_id) {}

    await res.status(201).json({
        message: 'startup info',
        body
    })
})

const tempSaveStartupBasicInfo = errorWrapper(async(req, res, next) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const { name, rep, establishedDate, sector, coreTechnology, homepage } = req.body
    const { logoImg, thumbnail } = req.files

    const sectorId = sector ? await CompanyService.getRelatedInfoId('sectors', sector) : undefined
    const coreTechnologyId = coreTechnology ? await CompanyService.getRelatedInfoId('technologies', coreTechnology) : undefined

    const companyFields = {
        name,
        logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
        established_date: await dateForm(establishedDate),
        homepage,
        company_types: { connect: { id: 1 } }
    }
    const startup_connect = {
        sectors: { connect: { id: Number(sectorId) } },
        technologies: { connect: { id: Number(coreTechnologyId) } },
    }
    const startup_field = {
        rep,
        thumbnail: thumbnail ? thumbnail[0].location : req.body.thumbnail ? req.body.thumbnail : null,
    }

    Object.keys(companyFields).forEach(key => companyFields[key] === undefined ? companyFields[key] = null : {});
    Object.keys(startup_connect).forEach(key => isNaN(startup_connect[key].connect.id) ? startup_connect[key] = undefined : {});
    Object.keys(startup_field).forEach(key => startup_field[key] === undefined ? startup_field[key] = null : {});

    const startupFields = {...startup_connect, ...startup_field }

    if (!req.foundUser.company_id) {
        const companyInfo = await CompanyService.createCompany(req.foundUser.id, companyFields);
        await CompanyService.createCompanyDetail(companyInfo.id, 'startups', startupFields);
    } else {
        const companyInfo = await CompanyService.updateCompany(req.foundUser.company_id, companyFields);
        await CompanyService.updateStartup(companyInfo.id, startupFields);
    };

    // save 기능 연결
    if (req.companySave) {
        next()
    } else {
        await res.status(201).json({
            message: 'startup basic info temporary saved'
        })
    }
});

const tempSaveStartupInfo = errorWrapper(async(req, res, next) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const { name, rep, establishedDate, sector, coreTechnology, homepage, description, itemDescription, investmentSeries, wishInvestmentSeries, investmentFund, teamIntro, memberCount, memberInfoNames, memberInfoPositions, companyNewsURLs, investedDates, investedInstitutions, investedFunds, investedValues, investedSeries } = req.body
    const { logoImg, startupImages, memberImages, thumbnail } = req.files

    const sectorId = sector ? await CompanyService.getRelatedInfoId('sectors', sector) : undefined
    const coreTechnologyId = coreTechnology ? await CompanyService.getRelatedInfoId('technologies', coreTechnology) : undefined
    const investmentSeriesId = investmentSeries ? await CompanyService.getRelatedInfoId('investment_series', investmentSeries) : undefined
    const investmentFundId = investmentFund ? await CompanyService.getRelatedInfoId('investment_funds', investmentFund) : undefined

    const companyFields = {
        name,
        logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
        established_date: await dateForm(establishedDate),
        homepage,
        description,
        team_intro: teamIntro,
        member_count: memberCount ? Number(memberCount) : null,
        company_types: { connect: { id: 1 } }
    }
    const startup_connect = {
        sectors: { connect: { id: sectorId } },
        technologies: { connect: { id: coreTechnologyId } },
        investment_series: { connect: { id: investmentSeriesId } },
        investment_funds: { connect: { id: investmentFundId } }
    }
    const startup_field = {
        rep,
        item_description: itemDescription,
        thumbnail: thumbnail ? thumbnail[0].location : req.body.thumbnail ? req.body.thumbnail : null,
    }

    Object.keys(companyFields).forEach(key => companyFields[key] === undefined ? companyFields[key] = null : {});
    Object.keys(startup_connect).forEach(key => isNaN(startup_connect[key].connect.id) ? startup_connect[key] = undefined : {});
    Object.keys(startup_field).forEach(key => startup_field[key] === undefined ? startup_field[key] = null : {});

    const startupFields = {...startup_connect, ...startup_field }

    let companyInfo
    let startupInfo

    if (!req.foundUser.company_id) {
        companyInfo = await CompanyService.createCompany(req.foundUser.id, companyFields);
        startupInfo = await CompanyService.createCompanyDetail(companyInfo.id, 'startups', startupFields);
    } else {
        companyInfo = await CompanyService.updateCompany(req.foundUser.company_id, companyFields);
        startupInfo = await CompanyService.updateStartup(companyInfo.id, startupFields);
    };

    // startup 이미지 추가
    if (startupImages) {
        if ((await CompanyService.imageLengthChecker('startup_images', { startup_id: startupInfo.id }) + startupImages.length) > 5) errorGenerator({ statusCode: 400, message: 'Images Limitation Exceeded' })
        for (len = 0; len < startupImages.length; len++) {
            await CompanyService.createRelatedInfo('startup_images',
                data = {
                    startups: { connect: { id: startupInfo.id } },
                    img_url: startupImages[len].location
                }
            )
        }
    }

    // 희망 투자 단계 추가 및 삭제
    if (wishInvestmentSeries) {
        if (typeof wishInvestmentSeries === 'string') {
            const existData = await CompanyService.checkWishInvestmentSeries(startupInfo.id)
            if (existData.length === 2) {
                await CompanyService.deleteWishInvestmentSeries(existData[1].id);
                const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries)
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: wishInvestmentSeriesId } }
                    }
                )
            } else if (existData.length === 1) {
                const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries)
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: wishInvestmentSeriesId } }
                    }
                )
            } else if (existData.length === 0) {
                const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries)
                await CompanyService.createWishInvestmentSeries(
                    data = {
                        startups: { connect: { id: startupInfo.id } },
                        investment_series: { connect: { id: wishInvestmentSeriesId } }
                    }
                )
            }
        } else {
            const existData = await CompanyService.checkWishInvestmentSeries(startupInfo.id)
            if (existData.length === 2) {
                for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
                    let wishInvestmentSeriesId = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries[len])
                    await CompanyService.updateWishInvestmentSeries(
                        id = existData[len].id,
                        data = {
                            investment_series: { connect: { id: wishInvestmentSeriesId } }
                        }
                    )
                }
            } else if (existData.length === 1) {
                const wishInvestmentSeriesIdFirst = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries[0])
                const wishInvestmentSeriesIdSecond = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries[1])
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: wishInvestmentSeriesIdFirst } }
                    }
                )
                await CompanyService.createWishInvestmentSeries(
                    data = {
                        startups: { connect: { id: startupInfo.id } },
                        investment_series: { connect: { id: wishInvestmentSeriesIdSecond } }
                    }
                )
            } else if (existData.length === 0) {
                for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
                    let wishInvestmentSeriesId = await CompanyService.getRelatedInfoId('investment_series', wishInvestmentSeries[len])
                    await CompanyService.createWishInvestmentSeries(
                        data = {
                            startups: { connect: { id: startupInfo.id } },
                            investment_series: { connect: { id: wishInvestmentSeriesId } }
                        }
                    )
                }
            }
        }
    }

    // 투자 이력 추가
    if (investedDates && investedInstitutions && investedFunds && investedValues && investedSeries) {
        if (typeChecker(investedDates, investedInstitutions, investedFunds, investedValues, investedSeries) === 'string') {
            const investedFundId = await CompanyService.getRelatedInfoId('investment_funds', investedFunds)
            const investedSeriesId = await CompanyService.getRelatedInfoId('investment_series', investedSeries)
            await CompanyService.createRelatedInfo('invested_from', data = {
                startups: { connect: { id: startupInfo.id } },
                date: await dateForm(investedDates),
                invested_institution: investedInstitutions,
                investment_funds: { connect: { id: investedFundId } },
                corporate_value: Number(investedValues),
                investment_series: { connect: { id: Number(investedSeriesId) } }
            })
        } else if (lengthChecker(investedDates, investedInstitutions, investedFunds, investedValues, investedSeries)) {
            for (len = 0; len < investedDates.length; len++) {
                let investedFundId = await CompanyService.getRelatedInfoId('investment_funds', investedFunds[len])
                let investedSeriesId = await CompanyService.getRelatedInfoId('investment_series', investedSeries[len])
                await CompanyService.createRelatedInfo('invested_from', data = {
                    startups: { connect: { id: startupInfo.id } },
                    date: await dateForm(investedDates[len]),
                    invested_institution: investedInstitutions[len],
                    investment_funds: { connect: { id: investedFundId } },
                    corporate_value: Number(investedValues[len]),
                    investment_series: { connect: { id: investedSeriesId } }
                })
            }
        }
    }

    // Team Memebr 추가
    if (memberInfoNames && memberInfoPositions && memberImages) {
        if (typeChecker(memberInfoNames, memberInfoPositions) === 'string' && memberImages.length === 1) {
            await CompanyService.createRelatedInfo('company_members', data = {
                companies: { connect: { id: companyInfo.id } },
                name: memberInfoNames,
                img: memberImages[0].location,
                position: memberInfoPositions
            })
        } else if (lengthChecker(memberInfoNames, memberInfoPositions, memberImages)) {
            for (len = 0; len < memberInfoNames.length; len++) {
                await CompanyService.createRelatedInfo('company_members', data = {
                    companies: { connect: { id: companyInfo.id } },
                    name: memberInfoNames[len],
                    img: memberImages[len].location,
                    position: memberInfoPositions[len]
                })
            }
        }
    }
    // News URL 추가
    if (companyNewsURLs) {
        if (typeof companyNewsURLs === 'string') {
            await CompanyService.createRelatedInfo('company_news', data = {
                companies: { connect: { id: companyInfo.id } },
                URL: companyNewsURLs
            })
        } else {
            for (len = 0; len < companyNewsURLs.length; len++) {
                await CompanyService.createRelatedInfo('company_news', data = {
                    companies: { connect: { id: companyInfo.id } },
                    URL: companyNewsURLs[len]
                })
            }
        }
    }

    // save 기능 연결
    if (req.companySave) {
        next()
    } else {
        await res.status(201).json({
            message: 'startup info temporary saved'
        })
    }
});


const saveStartupInfo = errorWrapper(async(req, res) => {
    const user = await UserService.findUserInfo({ id: req.foundUser.id })
    const companyId = user.company_id

    const company = await CompanyService.readCompany(companyId)
    const startup = await CompanyService.readCompanyDetail('startups', companyId)

    if (company === null) errorGenerator({ statusCode: 400, message: 'unidentified company data' })
    if (startup === null) errorGenerator({ statusCode: 400, message: 'unidentified startup data' })
    if (!(company.name || company.description || startup.rep || startup.sector_id || startup.core_technology_id || startup.item_description)) errorGenerator({ statusCode: 400, message: 'unfilled required infos' })

    CompanyService.saveInfo(companyId)

    await res.status(201).json({
        message: 'startup info saved'
    })
});


const saveStartupSubmitInfo = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const { name, rep, address, sector, coreTechnology, businessType, servcieType, businessLicenseNum, email, memberCount, homepage, instagramUrl, facebookUrl, logoImgURL } = req.body
    const { logoImg } = req.files

    const sectorId = sector ? await CompanyService.getRelatedInfoId('sectors', sector) : undefined
    const coreTechnologyId = coreTechnology ? await CompanyService.getRelatedInfoId('technologies', coreTechnology) : undefined
    const servcieTypeId = servcieType ? await CompanyService.getRelatedInfoId('service_types', servcieType) : undefined
    const businessTypeId = businessType ? await CompanyService.getRelatedInfoId('business_types', businessType) : undefined

    const company_fields = {
        name,
        logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
        homepage,
        team_intro: teamIntro,
        member_count: memberCount,
    }
    const startup_connect = {
        sectors: { connect: { id: Number(sectorId) } },
        technologies: { connect: { id: Number(coreTechnologyId) } },
        service_types: { connect: { id: Number(servcieTypeId) } },
        business_type_id: { connect: { id: Number(businessTypeId) } }
    }
    const startup_field = {
        rep,
        address,
        email,
        business_license_number: businessLicenseNum,
        instagram_url: instagramUrl,
        facebook_url: facebookUrl
    }

    Object.keys(company_fields).forEach(key => company_fields[key] === undefined ? company_fields[key] = null : {});
    Object.keys(startup_connect).forEach(key => isNaN(startup_connect[key].connect.id) ? startup_connect[key] = undefined : {});
    Object.keys(startup_field).forEach(key => startup_field[key] === undefined ? startup_field[key] = null : {});

    const startup_fields = {...startup_connect, ...startup_field }

    if (!req.foundUser.company_id) {
        const companyInfo = await CompanyService.createCompany(req.foundUser.id, company_fields);
        await CompanyService.createStartup(companyInfo.id, startup_fields);
    } else {
        const companyInfo = await CompanyService.updateCompany(req.foundUser.company_id, company_fields);
        await CompanyService.updateStartup(companyInfo.id, startup_fields);
    };

    await res.status(201).json({
        message: 'startup project info saved'
    })
})

// ---------------------------------- Partner ------------------------------------
const getPartnerInfo = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 1) errorGenerator({ statusCode: 400, message: 'this user is not partner user' })
    const body = {}
    if (req.foundUser.company_id) {
        const companyId = req.foundUser.company_id;
        const company = await CompanyService.findPartner({ id: companyId });

        body.name = company.name;
        body.logoImg = company.logo_img;
        body.establishedDate = company.established_date;
        body.investedCounts = company.partners[0].invested_counts;
        body.totalInvested = await CompanyService.findInfoName('investment_funds', company.partners[0].invested_total_id);
        body.interedtedTechnology = await CompanyService.findInfoName('technologies', company.partners[0].interst_technology_id);
        body.homepage = company.homepage;
        body.description = company.description;
        body.teamIntro = company.team_intro;
        body.memberCount = company.member_count;
        body.members = company.company_members
        body.news = company.company_news
        body.investedFrom = company.partners[0].invested_from
        body.portfolioImages = company.partners[0].investment_portfolio
    }

    await res.status(201).json({
        message: 'partner info',
        body
    })
})


const tempSavePartnerInfo = errorWrapper(async(req, res, next) => {
    if (req.foundUser.type_id === 1) errorGenerator({ statusCode: 400, message: 'this user is not partner user' })
    const { name, establishedDate, investedCounts, totalInvested, interedtedTechnology, homepage, description, investedDates, investedStartups, investedFunds, investedValues, investedSeries, teamIntro, memberCount, memberInfoNames, memberInfoPositions, companyNewsURLs, portfolioImagesDeleteIds, investedDeleteIds, memberDeleteIds, companyNewsDeleteIds } = req.body
    let { logoImg, portfolioImages, memberImages } = req.files
    const interedtedTechnologyId = interedtedTechnology ? await CompanyService.getRelatedInfoId('technologies', interedtedTechnology) : undefined
    const totalInvestedId = totalInvested ? await CompanyService.getRelatedInfoId('investment_funds', totalInvested) : undefined
    const companyFields = {
        name,
        logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
        established_date: await dateForm(establishedDate),
        homepage,
        description,
        team_intro: teamIntro,
        member_count: memberCount ? Number(memberCount) : null,
        company_types: { connect: { id: 2 } }
    }
    const partner_connect = {
        investment_funds: { connect: { id: totalInvestedId } },
        technologies: { connect: { id: Number(interedtedTechnologyId) } }
    }
    const partner_field = {
        invested_counts: Number(investedCounts),
    }
    Object.keys(companyFields).forEach(key => companyFields[key] === undefined ? companyFields[key] = null : {});
    Object.keys(partner_connect).forEach(key => isNaN(partner_connect[key].connect.id) ? partner_connect[key] = undefined : {});
    Object.keys(partner_field).forEach(key => partner_field[key] === undefined ? partner_field[key] = null : {});
    const partnerFields = {...partner_connect, ...partner_field }
    let companyInfo
    let partnerInfo
    if (!req.foundUser.company_id) {
        companyInfo = await CompanyService.createCompany(req.foundUser.id, companyFields);
        partnerInfo = await CompanyService.createCompanyDetail(companyInfo.id, 'partners', partnerFields);
    } else {
        companyInfo = await CompanyService.updateCompany(req.foundUser.company_id, companyFields);
        partnerInfo = await CompanyService.updatePartner(companyInfo.id, partnerFields);
    };
    // portfolio 이미지 추가
    if (portfolioImages) {
        if ((await CompanyService.imageLengthChecker('investment_portfolio', { partner_id: partnerInfo.id }) + portfolioImages.length) > 5) errorGenerator({ statusCode: 400, message: 'Images Limitation Exceeded' })
        for (len = 0; len < portfolioImages.length; len++) {
            await CompanyService.createRelatedInfo('investment_portfolio',
                data = {
                    partners: { connect: { id: partnerInfo.id } },
                    img_url: portfolioImages[len].location
                }
            )
        }
    }
    // 투자 이력 추가
    if (investedDates && investedStartups && investedFunds && investedValues && investedSeries) {
        if (typeChecker(investedDates, investedStartups, investedFunds, investedValues, investedSeries) === 'string') {
            const investedFundId = await CompanyService.getRelatedInfoId('investment_funds', investedFunds)
            const investedSeriesId = await CompanyService.getRelatedInfoId('investment_series', investedSeries)
            await CompanyService.createRelatedInfo('invested_to', data = {
                partners: { connect: { id: partnerInfo.id } },
                date: await dateForm(investedDates),
                invested_startup: investedStartups,
                investment_funds: { connect: { id: Number(investedFundId) } },
                corporate_value: Number(investedValues),
                investment_series: { connect: { id: Number(investedSeriesId) } }
            })
        } else if (lengthChecker(investedDates, investedStartups, investedFunds, investedValues, investedSeries)) {
            for (len = 0; len < investedDates.length; len++) {
                let investedFundId = await CompanyService.getRelatedInfoId('investment_funds', investedFunds[len])
                let investedSeriesId = await CompanyService.getRelatedInfoId('investment_series', investedSeries[len])
                await CompanyService.createRelatedInfo('invested_to', data = {
                    partners: { connect: { id: partnerInfo.id } },
                    date: await dateForm(investedDates[len]),
                    invested_startup: investedStartups[len],
                    investment_funds: { connect: { id: Number(investedFundId) } },
                    corporate_value: Number(investedValues[len]),
                    investment_series: { connect: { id: Number(investedSeriesId) } }
                })
            }
        }
    }
    // Team Memebr 추가
    if (memberInfoNames && memberInfoPositions && memberImages) {
        if (typeChecker(memberInfoNames, memberInfoPositions) === 'string' && memberImages.length === 1) {
            await CompanyService.createRelatedInfo('company_members', data = {
                companies: { connect: { id: companyInfo.id } },
                name: memberInfoNames,
                img: memberImages[0].location,
                position: memberInfoPositions
            })
        } else if (lengthChecker(memberInfoNames, memberInfoPositions, memberImages)) {
            for (len = 0; len < memberInfoNames.length; len++) {
                await CompanyService.createRelatedInfo('company_members', data = {
                    companies: { connect: { id: companyInfo.id } },
                    name: memberInfoNames[len],
                    img: memberImages[len].location,
                    position: memberInfoPositions[len]
                })
            }
        }
    }
    // News URL 추가
    if (companyNewsURLs) {
        if (typeof companyNewsURLs === 'string') {
            await CompanyService.createRelatedInfo('company_news', data = {
                companies: { connect: { id: companyInfo.id } },
                URL: companyNewsURLs
            })
        } else {
            for (len = 0; len < companyNewsURLs.length; len++) {
                await CompanyService.createRelatedInfo('company_news', data = {
                    companies: { connect: { id: companyInfo.id } },
                    URL: companyNewsURLs[len]
                })
            }
        }
    }
    // save 기능 연결
    if (req.companySave) {
        next()
    } else {
        await res.status(201).json({
            message: 'partner info temporary saved'
        })
    }
})


const savePartnerInfo = errorWrapper(async(req, res) => {
    const user = await UserService.findUserInfo({ id: req.foundUser.id })
    const companyId = user.company_id

    const company = await CompanyService.readCompany(companyId)
    const partner = await CompanyService.readCompanyDetail('partners', companyId)

    if (company === null) errorGenerator({ statusCode: 400, message: 'unidentified company data' })
    if (partner === null) errorGenerator({ statusCode: 400, message: 'unidentified partner data' })
    if (!(company.name || company.description || company.logo_img || partner.invested_counts || partner.interst_technology_id)) errorGenerator({ statusCode: 400, message: 'unfilled required infos' })

    CompanyService.saveInfo(companyId)

    await res.status(201).json({
        message: 'partner info saved'
    })
})

const getStartups = errorWrapper(async(req, res) => {
    const [companies, num] = await CompanyService.findStartups(req.query)
    if (req.loggedIn) {
        for (len = 0; len < companies.length; len++) {
            const liked = await LikeService.findIsLiked('startup_likes', req.foundUser.id, companies[len].id)
            companies[len].startups[0].is_liked = liked ? liked.is_liked : false
        }
    } else if (!req.loggedIn) {
        for (len = 0; len < companies.length; len++) {
            companies[len].startups[0].is_liked = false
        }
    }
    res.status(200).json({ companies, num })
})

const getOnestartup = errorWrapper(async(req, res) => {
    const { companyId } = req.params
    const company = await CompanyService.findStartup({ id: companyId })
    company.startups[0].sector = company.startups[0].sector_id ? await CompanyService.findInfoName('sectors', company.startups[0].sector_id) : null
    company.startups[0].core_technology = company.startups[0].core_technology_id ? await CompanyService.findInfoName('technologies', company.startups[0].core_technology_id) : null
    company.startups[0].investment_series = company.startups[0].investment_series_id ? await CompanyService.findInfoName('investment_series', company.startups[0].investment_series_id) : null
    company.startups[0].investment_fund = company.startups[0].investment_fund_id ? await CompanyService.findInfoName('investment_funds', company.startups[0].investment_fund_id) : null
    company.startups[0].service_type = company.startups[0].service_type_id ? await CompanyService.findInfoName('service_types', company.startups[0].service_type_id) : null
    company.startups[0].business_type = company.startups[0].business_type_id ? await CompanyService.findInfoName('business_types', company.startups[0].business_type_id) : null
    for (len = 0; len < company.startups[0].invested_from.length; len++) {
        company.startups[0].invested_from[len].invested_fund = await CompanyService.findInfoName('investment_funds', company.startups[0].invested_from[len].invested_fund_id)
        company.startups[0].invested_from[len].series = await CompanyService.findInfoName('investment_series', company.startups[0].invested_from[len].series_id)
    }

    if (req.loggedIn) {
        Liked = await LikeService.findIsLiked('startup_likes', req.foundUser.id, companyId)
        company.startups[0].is_liked = Liked ? Liked.is_liked : false
    } else if (!req.loggedIn) {
        company.startups[0].is_liked = false
    }

    res.status(200).json({ company })
})

const getPartners = errorWrapper(async(req, res) => {
    const [companies, num] = await CompanyService.findPartners(req.query)
    res.status(200).json({ companies, num })
})

const getOnePartner = errorWrapper(async(req, res) => {
    const { companyId } = req.params
    const company = await CompanyService.findPartner({ id: companyId })
    console.log(company)

    if ('interst_technology_id' in Object.keys(company.partners[0])) {
        company.partners[0].interst_technology = await CompanyService.findInfoName('technologies', company.partners[0].interst_technology_id)
    }
    if ('invested_total_id' in Object.keys(company.partners[0])) {
        company.partners[0].investment_total = await CompanyService.findInfoName('investment_funds', company.partners[0].invested_total_id)
    }
    for (len = 0; len < company.partners[0].invested_to.length; len++) {
        company.partners[0].invested_to[len].invested_fund = await CompanyService.findInfoName('investment_funds', company.partners[0].invested_to[len].invested_fund_id)
        company.partners[0].invested_to[len].series = await CompanyService.findInfoName('investment_series', company.partners[0].invested_to[len].series_id)
    }

    if (req.loggedIn) {
        const liked = await LikeService.findIsLiked('partner_likes', req.foundUser.id, companyId)
        company.partners[0].is_liked = liked ? liked.is_liked : false
    } else if (!req.loggedIn) {
        company.partners[0].is_liked = false
    }

    res.status(200).json({ company })
})

const likeCompany = errorWrapper(async(req, res) => {
    const { companyId } = req.params
    const userId = req.foundUser.id
    const where = {
        user_id: Number(userId),
        company_id: Number(companyId)
    }
    const data = {
        users: { connect: { id: Number(userId) } },
        companies: { connect: { id: Number(companyId) } },
    }
    const { type_id } = await CompanyService.readCompany(Number(companyId))
    let object

    if (type_id === 1) {
        object = 'startup_likes'
    } else if (type_id === 2) {
        if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: "partner user can't like other partners" })
        object = 'partner_likes'
    }

    const like = await LikeService.like(object, where, data)
    await res.status(201).json({
        message: 'Company Like Updated',
        result: like.is_liked
    })
})



const startupIRCount = errorWrapper(async(req, res) => {
    const { companyId } = req.params
    const countingRegisteredIR = await CompanyService.irRegisteredCount({ id: companyId })
    const countingSentIR = await CompanyService.irSentCount({ id: companyId })
    const countingRequestedIR = await CompanyService.irRequestedCount({ id: companyId })
    res.status(200).json({
        countingRegisteredIR,
        countingSentIR,
        countingRequestedIR
    })
})


const uploadStartupDoc = errorWrapper(async(req, res) => {
    const { companyId, docTypeId } = req.body
    const startupDoc = req.file ? req.file.location : null;
    const addInfo = await CompanyService.registerDoc({ companyId, docTypeId, startupDoc })
    res.status(201).json({
        message: 'information successfully added',
        addInfo
    })
})

const downloadStartupDoc = errorWrapper(async(req, res) => {
    const { companyId, docTypeId } = req.params
    const fileKey = req.query['fileKey']
    const fileStream = s3.getObject(options).createReadStream()
    fileStream.pipe(res)

    res.download(file)

})

const readStartupDoc = errorWrapper(async(req, res) => {
    const { companyId, docTypeId } = req.params
    const readStartupDoc = await CompanyService.readByDocType({ companyId, docTypeId })
    res.status(200).json({
        message: 'documents successfully read'

    })
})

const deleteStartupDoc = errorWrapper(async(req, res) => {
    const { docURL } = req.body
    const { companyId, docTypeId } = req.params
    const deleteStartupDoc = await CompanyService.deleteSDoc({ companyId, docTypeId, docURL })
    res.status(204).json({
        deleteStartupDoc,
        message: 'document successfully deleted'

    })
})

module.exports = {
    getStartupInfo,
    tempSaveStartupInfo,
    tempSaveStartupBasicInfo,
    saveStartupInfo,
    saveStartupSubmitInfo,
    getPartnerInfo,
    tempSavePartnerInfo,
    savePartnerInfo,
    getStartups,
    getPartners,
    likeCompany,
    getOnePartner,
    getOnestartup,
    deleteMember,
    deleteInvestFrom,
    deleteInvestTo,
    deleteImage,
    deleteNews,
    startupIRCount,
    uploadStartupDoc,
    downloadStartupDoc,
    readStartupDoc,
    deleteStartupDoc,

}