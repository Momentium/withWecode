const { CompanyService } = require('../services')
const dayjs = require('dayjs')
const { typeChecker, lengthChecker } = require('../utils')
const { errorWrapper, errorGenerator } = require('../errors');


const startupInfoTempSave = errorWrapper(async(req, res) => {
    if (!req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })

    const { name, rep, establishedDate, sectorId, coreTechnologyId, homepage, description, itemDescription, investmentSeriesId, wishInvestmentSeriesIds, investmentFundId, teamIntro, memberCount, memberInfoNames, memberDeleteIds, memberInfoPositions, companyNewsURLs, companyNewsDeleteIds, logoImgURL, startupImagesDeleteIds, investedDates, investedInstitutions, investedFunds, investedValues, investedSeries, investedDeleteIds, thumbnailURL } = req.body
    const { logoImg, startupImages, memberImages, thumbnail } = req.files

    const company_fields = {
        name,
        logo_img: logoImg ? logoImg[0].location : logoImgURL ? logoImgURL : null,
        established_date: establishedDate,
        homepage,
        description,
        team_intro: teamIntro,
        member_count: memberCount,
    }
    const startup_connect = {
        sectors: { connect: { id: Number(sectorId) } },
        technologies: { connect: { id: Number(coreTechnologyId) } },
        investment_series: { connect: { id: Number(investmentSeriesId) } },
        investment_funds: { connect: { id: Number(investmentFundId) } }
    }
    const startup_field = {
        rep,
        item_description: itemDescription,
        thumbnail: thumbnail ? thumbnail[0].location : thumbnailURL ? thumbnailURL : null,
    }

    Object.keys(company_fields).forEach(key => company_fields[key] === undefined ? company_fields[key] = null : {});
    Object.keys(startup_connect).forEach(key => isNaN(startup_connect[key].connect.id) ? startup_connect[key] = undefined : {});
    Object.keys(startup_field).forEach(key => startup_field[key] === undefined ? startup_field[key] = null : {});

    const startup_fields = {...startup_connect, ...startup_field }

    let companyInfo
    let startupInfo

    if (!req.foundUser.company_id) {
        companyInfo = await CompanyService.createCompany(req.foundUser.id, company_fields);
        startupInfo = await CompanyService.createStartup(companyInfo.id, startup_fields);
    } else {
        companyInfo = await CompanyService.updateCompany(req.foundUser.company_id, company_fields);
        startupInfo = await CompanyService.updateStartup(companyInfo.id, startup_fields);
    };

    // startup 이미지 추가
    if (startupImages) {
        for (len = 0; len < startupImages.length; len++) {
            await CompanyService.createRelatedInfo('startup_images',
                data = {
                    startups: { connect: { id: startupInfo.id } },
                    img_url: startupImages[len].location
                }
            )
        }
    }

    // startup 이미지 삭제
    if (startupImagesDeleteIds) {
        if (typeof startupImagesDeleteIds === 'string') {
            if (await CompanyService.checkExistence('startup_images', data = { id: Number(startupImagesDeleteIds) })) {
                await CompanyService.deleteRelatedInfo('startup_images', Number(startupImagesDeleteIds))
            };
        } else {
            for (len = 0; len < startupImagesDeleteIds.length; len++) {
                if (await CompanyService.checkExistence('startup_images', data = { id: Number(startupImagesDeleteIds[len]) })) {
                    await CompanyService.deleteRelatedInfo('startup_images', Number(startupImagesDeleteIds[len]))
                }
            };
        }
    }

    // 희망 투자 단계 추가 및 삭제
    if (wishInvestmentSeriesIds) {
        if (typeof wishInvestmentSeriesIds === 'string') {
            const existData = await CompanyService.checkWishInvestmentSeries(startupInfo.id)
            if (existData.length === 2) {
                await CompanyService.deleteWishInvestmentSeries(existData[1].id);
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: Number(wishInvestmentSeriesIds) } }
                    }
                )
            } else if (existData.length === 1) {
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: Number(wishInvestmentSeriesIds) } }
                    }
                )
            } else if (existData.length === 0) {
                await CompanyService.createWishInvestmentSeries(
                    data = {
                        startups: { connect: { id: startupInfo.id } },
                        investment_series: { connect: { id: Number(wishInvestmentSeriesIds) } }
                    }
                )
            }
        } else {
            const existData = await CompanyService.checkWishInvestmentSeries(startupInfo.id)
            if (existData.length === 2) {
                for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
                    await CompanyService.updateWishInvestmentSeries(
                        id = existData[len].id,
                        data = {
                            investment_series: { connect: { id: Number(wishInvestmentSeriesIds[len]) } }
                        }
                    )
                }
            } else if (existData.length === 1) {
                await CompanyService.updateWishInvestmentSeries(
                    id = existData[0].id,
                    data = {
                        investment_series: { connect: { id: Number(wishInvestmentSeriesIds[0]) } }
                    }
                )
                await CompanyService.createWishInvestmentSeries(
                    data = {
                        startups: { connect: { id: startupInfo.id } },
                        investment_series: { connect: { id: Number(wishInvestmentSeriesIds[1]) } }
                    }
                )
            } else if (existData.length === 0) {
                for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
                    console.log(Number(wishInvestmentSeriesIds[len]))
                    await CompanyService.createWishInvestmentSeries(
                        data = {
                            startups: { connect: { id: startupInfo.id } },
                            investment_series: { connect: { id: Number(wishInvestmentSeriesIds[len]) } }
                        }
                    )
                }
            }
        }
    }

    // 투자 이력 추가
    if (investedDates && investedInstitutions && investedFunds && investedValues && investedSeries) {
        if (typeChecker(investedDates, investedInstitutions, investedFunds, investedValues, investedSeries) === 'string') {
            const datemodified = await dayjs(investedDates).toDate()
            await CompanyService.createRelatedInfo('invested_from', data = {
                startups: { connect: { id: startupInfo.id } },
                date: datemodified,
                invested_institution: investedInstitutions,
                investment_funds: { connect: { id: Number(investedFunds) } },
                corporate_value: Number(investedValues),
                investment_series: { connect: { id: Number(investedSeries) } }
            })
        } else if (lengthChecker(investedDates, investedInstitutions, investedFunds, investedValues, investedSeries)) {
            for (len = 0; len < investedDates.length; len++) {
                const datemodified = await dayjs(investedDates[len]).toDate()
                await CompanyService.createRelatedInfo('invested_from', data = {
                    startups: { connect: { id: startupInfo.id } },
                    date: datemodified,
                    invested_institution: investedInstitutions[len],
                    investment_funds: { connect: { id: Number(investedFunds[len]) } },
                    corporate_value: Number(investedValues[len]),
                    investment_series: { connect: { id: Number(investedSeries[len]) } }
                })
            }
        }
    }

    // 투자 이력 삭제
    if (investedDeleteIds) {
        if (typeof investedDeleteIds === 'string') {
            if (await CompanyService.checkExistence('invested_from', data = { id: Number(investedDeleteIds) })) {
                await CompanyService.deleteRelatedInfo('invested_from', Number(investedDeleteIds))
            };
        } else {
            for (len = 0; len < investedDeleteIds.length; len++) {
                if (await CompanyService.checkExistence('invested_from', data = { id: Number(investedDeleteIds[len]) })) {
                    await CompanyService.deleteRelatedInfo('invested_from', Number(investedDeleteIds[len]))
                }
            };
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

    // Team Memebr 삭제
    if (memberDeleteIds) {
        if (typeof memberDeleteIds === 'string') {
            if (await CompanyService.checkExistence('company_members', data = { id: Number(memberDeleteIds) })) {
                await CompanyService.deleteRelatedInfo('company_members', Number(memberDeleteIds))
            };
        } else {
            for (len = 0; len < memberDeleteIds.length; len++) {
                if (await CompanyService.checkExistence('company_members', data = { id: Number(memberDeleteIds[len]) })) {
                    await CompanyService.deleteRelatedInfo('company_members', Number(memberDeleteIds[len]))
                }
            };
        }
    };

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

    // News URL 삭제
    if (companyNewsDeleteIds) {
        if (typeof companyNewsDeleteIds === 'string') {
            if (await CompanyService.checkExistence('company_news', data = { id: Number(companyNewsDeleteIds) })) {
                await CompanyService.deleteRelatedInfo('company_news', Number(companyNewsDeleteIds))
            };
        } else {
            for (len = 0; len < companyNewsDeleteIds.length; len++) {
                if (await CompanyService.checkExistence('company_news', data = { id: Number(companyNewsDeleteIds[len]) })) {
                    await CompanyService.deleteRelatedInfo('company_news', Number(companyNewsDeleteIds[len]))
                }
            };
        }
    };

    // save 기능 연결
    if (req.save) {
        next()
    }

    await res.status(201).json({
        message: 'startup info temporary saved'
    })
});

const startupInfoSave = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const company = CompanyService.readCompany(req.foundUser.company_id)
    const startup = CompanyService.readStartup(req.foundUser.company_id)
    if (company === null) errorGenerator({ statusCode: 400, message: 'unidentified company data' })
    if (startup === null) errorGenerator({ statusCode: 400, message: 'unidentified startup data' })
    if (company.name || company.description || startup.rep || startup.sector_id || startup.core_technology_id || startup.item_description) errorGenerator({ statusCode: 400, message: 'unfilled required infos' })

    await res.status(201).json({
        message: 'startup info saved'
    })
});

const startupProjectSubmitSave = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: 'this user is not startup user' })
    const { name, rep, address, sectorId, coreTechnologyId, businessTypeId, servcieTypeId, businessLicenseNum, email, memberCount, homepage, instagramUrl, facebookUrl, logoImgURL } = req.body
    const { logoImg } = req.files

    const company_fields = {
        name,
        logo_img: logoImg ? logoImg[0].location : logoImgURL ? logoImgURL : null,
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
        message: 'startup info saved'
    })
})

const partnerInfoTempSave = errorWrapper(async(req, res) => {
    if (req.foundUser.type_id === 1) errorGenerator({ statusCode: 400, message: 'this user is not partner user' })
    const { name, rep, establishedDate, sectorId, coreTechnologyId, homepage, description, itemDescription, investmentSeriesId, wishInvestmentSeriesIds, investmentFundId, teamIntro, memberCount, memberInfoNames, memberDeleteIds, memberInfoPositions, companyNewsURLs, companyNewsDeleteIds, logoImgURL, startupImagesDeleteIds, investedDates, investedInstitutions, investedFunds, investedValues, investedSeries, investedDeleteIds } = req.body
    const { logoImg, startupImages, memberImages } = req.files
})

module.exports = {
    startupInfoTempSave,
    startupInfoSave,
    partnerInfoTempSave,
    startupProjectSubmitSave
}