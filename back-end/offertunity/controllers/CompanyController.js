const { CompanyService, UserService, LikeService } = require("../services");

const { typeChecker, lengthChecker, dateForm } = require("../utils");
const { errorWrapper, errorGenerator } = require("../errors");

const deleteMember = errorWrapper(async (req, res) => {
  const { memberId } = req.params;
  const member = await CompanyService.readRelatedInfo(
    "company_members",
    Number(memberId)
  );
  if (!member)
    errorGenerator({ statusCode: 400, message: "Unrecognized Member" });
  if (req.foundUser.company_id === member.company_id) {
    await CompanyService.deleteRelatedInfo("company_members", Number(memberId));
    await res.status(201).json({
      message: "member deleted",
    });
  } else {
    errorGenerator({
      statusCode: 400,
      message: "this member is not belonged to this company",
    });
  }
});

const deleteImage = errorWrapper(async (req, res) => {
  const { imageId } = req.params;
  if (req.foundUser.type_id === 1) {
    CompanyService.deleteRelatedInfo("startup_images", Number(imageId));
  } else if (req.foundUser.type_id === 2) {
    CompanyService.deleteRelatedInfo("investment_portfolio", Number(imageId));
  }
});

const deleteNews = errorWrapper(async (req, res) => {
  const { newsId } = req.params;
  const news = await CompanyService.readRelatedInfo(
    "company_news",
    Number(newsId)
  );

  if (req.foundUser.company_id === news.company_id) {
    await CompanyService.deleteRelatedInfo("company_news", Number(memberId));
    await res.status(201).json({
      message: "news deleted",
    });
  } else {
    errorGenerator({
      statusCode: 400,
      message: "this news is not belonged to this company",
    });
  }
});

// startup -------------------------------------------------------------------------------
// startup Info Read
const getStartupInfo = errorWrapper(async (req, res) => {
  if (req.foundUser.type_id === 2) errorGenerator({statusCode: 400, message: "this user is not startup user"});
  const body = {};
  if (req.foundUser.company_id) {
    const companyId = req.foundUser.company_id;
    const company = await CompanyService.findStartup({ id: companyId });

    body.name = company.name;
    body.rep = company.startups[0].rep;
    body.establishedDate = company.established_date;
    body.sector = company.startups[0].sector_id ? await CompanyService.findInfoName("sectors", company.startups[0].sector_id) : null;
    body.coreTechnology = company.startups[0].core_technology_id ? await CompanyService.findInfoName("technologies", company.startups[0].core_technology_id) : null;
    body.homepage = company.homepage;
    body.description = company.description;
    body.itemDescription = company.startups[0].item_description;

    if (company.startups[0].investment_series_id && !(company.startups[0].wish_investment_series === []) && company.startups[0].investment_fund_id) {
      body.investmentSeries = company.startups[0].investment_series_id ? await CompanyService.findInfoName("investment_series",company.startups[0].investment_series_id) : null;
      body.wishInvestmentSeriesIds = [];
      for (len = 0; len < company.startups[0].wish_investment_series.length;len++) {
        body.wishInvestmentSeriesIds.push(await CompanyService.findInfoName("investment_series", company.startups[0].wish_investment_series[len].investment_series_id));
      };
      body.investmentFundId = await CompanyService.findInfoName("investment_funds", company.startups[0].investment_fund_id);
    }
    body.teamIntro = company.team_intro;
    body.memberCount = company.member_count;
    body.members = company.company_members;
    body.news = company.company_news;
    body.investedFrom = company.startups[0].invested_from;
    if (!(body.investedFrom.length === 0)) {
      for (len = 0; len < body.investedFrom.length; len++) {
        body.investedFrom[len].investedFunds = body.investedFrom[len].invested_fund_id ? await CompanyService.findInfoName("investment_funds", body.investedFrom[len].invested_fund_id) : null;
        body.investedFrom[len].investedSeries = body.investedFrom[len].series_id ? await CompanyService.findInfoName("investment_series", body.investedFrom[len].series_id) : null;
        body.investedFrom[len].investedDates = `${body.investedFrom[len].date.getUTCFullYear()}.${body.investedFrom[len].date.getUTCMonth()+1}`
        body.investedFrom[len].investedValues = body.investedFrom[len].corporate_value
        body.investedFrom[len].investedInstitutions = body.investedFrom[len].invested_institution

        delete body.investedFrom[len].date
        delete body.investedFrom[len].invested_institution
        delete body.investedFrom[len].corporate_value
        delete body.investedFrom[len].invested_fund_id
        delete body.investedFrom[len].series_id
      }
    }
    body.images = company.startups[0].startup_images;
    body.logoImg = company.logo_img;
    body.thumbnail = company.startups[0].thumbnail;
  } else if (!req.foundUser.company_id) {
  }

  await res.status(201).json({
    message: "startup info",
    body,
  });
});

const tempSaveStartupBasicInfo = errorWrapper(async (req, res, next) => {
  if (req.foundUser.type_id === 2)
    errorGenerator({
      statusCode: 400,
      message: "this user is not startup user",
    });
  const {
    name,
    rep,
    establishedDate,
    sector,
    coreTechnology,
    homepage,
  } = req.body;
  const { logoImg, thumbnail } = req.files;

  const sectorId = sector
    ? await CompanyService.getRelatedInfoId("sectors", sector)
    : undefined;
  const coreTechnologyId = coreTechnology
    ? await CompanyService.getRelatedInfoId("technologies", coreTechnology)
    : undefined;

  const companyFields = {
    name,
    logo_img: logoImg
      ? logoImg[0].location
      : req.body.logoImg
      ? req.body.logoImg
      : null,
    established_date: await dateForm(establishedDate),
    homepage,
    company_types: { connect: { id: 1 } },
  };
  const startup_connect = {
    sectors: { connect: { id: Number(sectorId) } },
    technologies: { connect: { id: Number(coreTechnologyId) } },
  };
  const startup_field = {
    rep,
    thumbnail: thumbnail
      ? thumbnail[0].location
      : req.body.thumbnail
      ? req.body.thumbnail
      : null,
  };

  Object.keys(companyFields).forEach((key) =>
    companyFields[key] === undefined ? (companyFields[key] = null) : {}
  );
  Object.keys(startup_connect).forEach((key) =>
    isNaN(startup_connect[key].connect.id)
      ? (startup_connect[key] = undefined)
      : {}
  );
  Object.keys(startup_field).forEach((key) =>
    startup_field[key] === undefined ? (startup_field[key] = null) : {}
  );

  const startupFields = { ...startup_connect, ...startup_field };

  if (!req.foundUser.company_id) {
    const companyInfo = await CompanyService.createCompany(
      req.foundUser.id,
      companyFields
    );
    await CompanyService.createCompanyDetail(
      companyInfo.id,
      "startups",
      startupFields
    );
  } else {
    const companyInfo = await CompanyService.updateCompany(
      req.foundUser.company_id,
      companyFields
    );
    await CompanyService.updateStartup(companyInfo.id, startupFields);
  }

    await res.status(201).json({
      message: "startup basic info temporary saved",
    });
});

const tempSaveStartupInfo = errorWrapper(async (req, res, next) => {
  if (req.foundUser.type_id === 2)
    errorGenerator({
      statusCode: 400,
      message: "this user is not startup user",
    });
  const {
    name,
    rep,
    establishedDate,
    sector,
    coreTechnology,
    homepage,
    description,
    itemDescription,
    investmentSeries,
    wishInvestmentSeries,
    investmentFund,
    teamIntro,
    memberCount,
    memberInfoNames,
    memberInfoPositions,
    companyNewsURLs,
    investedFrom,
  } = req.body;
  const { logoImg, startupImages, memberImages, thumbnail } = req.files;

  const sectorId = sector
    ? await CompanyService.getRelatedInfoId("sectors", sector)
    : undefined;
  const coreTechnologyId = coreTechnology
    ? await CompanyService.getRelatedInfoId("technologies", coreTechnology)
    : undefined;
  const investmentSeriesId = investmentSeries
    ? await CompanyService.getRelatedInfoId(
        "investment_series",
        investmentSeries
      )
    : undefined;
  const investmentFundId = investmentFund
    ? await CompanyService.getRelatedInfoId("investment_funds", investmentFund)
    : undefined;

  const companyFields = {
    name,
    logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
    established_date: await dateForm(establishedDate),
    homepage,
    description,
    team_intro: teamIntro,
    member_count: memberCount ? Number(memberCount) : null,
    company_types: { connect: { id: 1 } },
  };
  const startup_connect = {
    sectors: { connect: { id: sectorId } },
    technologies: { connect: { id: coreTechnologyId } },
    investment_series: { connect: { id: investmentSeriesId } },
    investment_funds: { connect: { id: investmentFundId } },
  };
  const startup_field = {
    rep,
    item_description: itemDescription,
    thumbnail: thumbnail
      ? thumbnail[0].location
      : req.body.thumbnail
      ? req.body.thumbnail
      : null,
  };

  Object.keys(companyFields).forEach((key) =>
    companyFields[key] === undefined ? (companyFields[key] = null) : {}
  );
  Object.keys(startup_connect).forEach((key) =>
    isNaN(startup_connect[key].connect.id)
      ? (startup_connect[key] = undefined)
      : {}
  );
  Object.keys(startup_field).forEach((key) =>
    startup_field[key] === undefined ? (startup_field[key] = null) : {}
  );

  const startupFields = { ...startup_connect, ...startup_field };

  let companyInfo;
  let startupInfo;

  if (!req.foundUser.company_id) {
    companyInfo = await CompanyService.createCompany(
      req.foundUser.id,
      companyFields
    );
    startupInfo = await CompanyService.createCompanyDetail(
      companyInfo.id,
      "startups",
      startupFields
    );
  } else {
    companyInfo = await CompanyService.updateCompany(
      req.foundUser.company_id,
      companyFields
    );
    startupInfo = await CompanyService.updateStartup(
      companyInfo.id,
      startupFields
    );
  }

  // startup 이미지 추가
  if (startupImages) {
    if (
      (await CompanyService.imageLengthChecker("startup_images", {
        startup_id: startupInfo.id,
      })) +
        startupImages.length >
      5
    )
      errorGenerator({
        statusCode: 400,
        message: "Images Limitation Exceeded",
      });
    for (len = 0; len < startupImages.length; len++) {
      await CompanyService.createRelatedInfo(
        "startup_images",
        (data = {
          startups: { connect: { id: startupInfo.id } },
          img_url: startupImages[len].location,
        })
      );
    }
  }

  // 희망 투자 단계 추가 및 삭제
  if (wishInvestmentSeries) {
    if (typeof wishInvestmentSeries === "string") {
      const existData = await CompanyService.checkWishInvestmentSeries(
        startupInfo.id
      );
      if (existData.length === 2) {
        await CompanyService.deleteWishInvestmentSeries(existData[1].id);
        const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId(
          "investment_series",
          wishInvestmentSeries
        );
        await CompanyService.updateWishInvestmentSeries(
          (id = existData[0].id),
          (data = {
            investment_series: { connect: { id: wishInvestmentSeriesId } },
          })
        );
      } else if (existData.length === 1) {
        const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId(
          "investment_series",
          wishInvestmentSeries
        );
        await CompanyService.updateWishInvestmentSeries(
          (id = existData[0].id),
          (data = {
            investment_series: { connect: { id: wishInvestmentSeriesId } },
          })
        );
      } else if (existData.length === 0) {
        const wishInvestmentSeriesId = await CompanyService.getRelatedInfoId(
          "investment_series",
          wishInvestmentSeries
        );
        await CompanyService.createWishInvestmentSeries(
          (data = {
            startups: { connect: { id: startupInfo.id } },
            investment_series: { connect: { id: wishInvestmentSeriesId } },
          })
        );
      }
    } else {
      const existData = await CompanyService.checkWishInvestmentSeries(
        startupInfo.id
      );
      if (existData.length === 2) {
        for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
          let wishInvestmentSeriesId = await CompanyService.getRelatedInfoId(
            "investment_series",
            wishInvestmentSeries[len]
          );
          await CompanyService.updateWishInvestmentSeries(
            (id = existData[len].id),
            (data = {
              investment_series: { connect: { id: wishInvestmentSeriesId } },
            })
          );
        }
      } else if (existData.length === 1) {
        const wishInvestmentSeriesIdFirst = await CompanyService.getRelatedInfoId(
          "investment_series",
          wishInvestmentSeries[0]
        );
        const wishInvestmentSeriesIdSecond = await CompanyService.getRelatedInfoId(
          "investment_series",
          wishInvestmentSeries[1]
        );
        await CompanyService.updateWishInvestmentSeries(
          (id = existData[0].id),
          (data = {
            investment_series: { connect: { id: wishInvestmentSeriesIdFirst } },
          })
        );
        await CompanyService.createWishInvestmentSeries(
          (data = {
            startups: { connect: { id: startupInfo.id } },
            investment_series: {
              connect: { id: wishInvestmentSeriesIdSecond },
            },
          })
        );
      } else if (existData.length === 0) {
        for (len = 0; len < wishInvestmentSeriesIds.length; len++) {
          let wishInvestmentSeriesId = await CompanyService.getRelatedInfoId(
            "investment_series",
            wishInvestmentSeries[len]
          );
          await CompanyService.createWishInvestmentSeries(
            (data = {
              startups: { connect: { id: startupInfo.id } },
              investment_series: { connect: { id: wishInvestmentSeriesId } },
            })
          );
        }
      }
    }
  }

  // 투자 유치 이력 프로세싱
  const investedFromProcess = async (investedFrom) => {
    if (investedFrom.id) {
      const existData = await CompanyService.readRelatedInfo("invested_from", Number(investedFrom.id));
      if (existData === [])
        errorGenerator({ statusCode: 400, message: "Invalid Invest Data" });
      if (!(existData.startup_id === startupInfo.id))
        errorGenerator({
          statusCode: 400,
          message: "this invest record is not beloged to this company",
        });
      CompanyService.deleteRelatedInfo("invested_from", Number(investedFrom.id));
    } else if (!investedFrom.id) {
      const investedFundId = await CompanyService.getRelatedInfoId(
        "investment_funds",
        investedFrom.investedFunds
      );
      const investedSeriesId = await CompanyService.getRelatedInfoId(
        "investment_series",
        investedFrom.investedSeries
      );
      const datesList = investedFrom.investedDates.split(".");
      const Dates = `${datesList[0]}-${datesList[1]}-01`;
      CompanyService.createRelatedInfo(
        "invested_from",
        (data = {
          startups: { connect: { id: startupInfo.id } },
          date: await dateForm(Dates),
          invested_institution: investedFrom.investedInstitutions,
          investment_funds: { connect: { id: Number(investedFundId) } },
          corporate_value: Number(investedFrom.investedValues),
          investment_series: { connect: { id: Number(investedSeriesId) } },
        })
      );
    }
  };

  // 투자 이력 추가 및 삭제
  if (investedFrom) {
    jsonInvestedFrom = JSON.parse(investedFrom)
    for (let len = 0; len < jsonInvestedFrom.length; len++) {
      await investedFromProcess(jsonInvestedFrom[len]);
    }
  }

  // Team Memebr 추가
  if (memberInfoNames && memberInfoPositions && memberImages) {
    if (
      typeChecker(memberInfoNames, memberInfoPositions) === "string" &&
      memberImages.length === 1
    ) {
      await CompanyService.createRelatedInfo(
        "company_members",
        (data = {
          companies: { connect: { id: companyInfo.id } },
          name: memberInfoNames,
          img: memberImages[0].location,
          position: memberInfoPositions,
        })
      );
    } else if (
      lengthChecker(memberInfoNames, memberInfoPositions, memberImages)
    ) {
      for (len = 0; len < memberInfoNames.length; len++) {
        await CompanyService.createRelatedInfo(
          "company_members",
          (data = {
            companies: { connect: { id: companyInfo.id } },
            name: memberInfoNames[len],
            img: memberImages[len].location,
            position: memberInfoPositions[len],
          })
        );
      }
    }
  }

  // News URL 추가
  if (companyNewsURLs) {
    if (typeof companyNewsURLs === "string") {
      await CompanyService.createRelatedInfo(
        "company_news",
        (data = {
          companies: { connect: { id: companyInfo.id } },
          URL: companyNewsURLs,
        })
      );
    } else {
      for (len = 0; len < companyNewsURLs.length; len++) {
        await CompanyService.createRelatedInfo(
          "company_news",
          (data = {
            companies: { connect: { id: companyInfo.id } },
            URL: companyNewsURLs[len],
          })
        );
      }
    }
  }

  // save 기능 연결
  if (req.save) {
    next();
  } else {
    await res.status(201).json({
      message: "startup info temporary saved",
    });
  }
});

const saveStartupInfo = errorWrapper(async (req, res) => {
  const user = await UserService.findUserInfo({ id: req.foundUser.id });
  const companyId = user.company_id;

  const company = await CompanyService.readCompany(companyId);
  const startup = await CompanyService.readCompanyDetail("startups", companyId);

  if (company === null)
    errorGenerator({ statusCode: 400, message: "unidentified company data" });
  if (startup === null)
    errorGenerator({ statusCode: 400, message: "unidentified startup data" });
  if (
    !(
      company.name ||
      company.description ||
      startup.rep ||
      startup.sector_id ||
      startup.core_technology_id ||
      startup.item_description
    )
  )
    errorGenerator({ statusCode: 400, message: "unfilled required infos" });

  CompanyService.saveInfo(companyId);

  await res.status(201).json({
    message: "startup info saved",
  });
});

const getStartupSubmitInfo = errorWrapper(async(req, res) => {
  if (req.foundUser.type_id === 2) errorGenerator({statusCode: 400, message: "this user is not startup user"});
  const body = {};
  if (req.foundUser.company_id) {
    const companyId = req.foundUser.company_id;
    const company = await CompanyService.findStartup({ id: companyId });

    body.name = company.name;
    body.logoImg = company.logo_img;
    body.rep = company.startups[0].rep;
    body.contact = company.startups[0].contact;
    body.address = company.startups[0].address_road;
    body.sector = company.startups[0].sector_id ? await CompanyService.findInfoName("sectors", company.startups[0].sector_id) : null;
    body.technology = company.startups[0].core_technology_id ? await CompanyService.findInfoName("technologies", company.startups[0].core_technology_id) : null;
    body.businessType = company.startups[0].business_type_id ? await CompanyService.findInfoName("business_types", company.startups[0].business_type_id) : null;
    body.businessLicenseNum = company.startups[0].business_license_number;
    body.email = company.startups[0].email;
    body.memberCount = company.member_count;
    body.homepage = company.homepage ? company.homepage : null;
    body.instagram = company.startups[0].instagram_url;
    body.facebook = company.startups[0].facebook_url;

  } else if (!req.foundUser.company_id) {
  }

  await res.status(201).json({
    message: "startup submit info",
    body,
  });

})

const saveStartupSubmitInfo = errorWrapper(async (req, res) => {
  if (req.foundUser.type_id === 2) errorGenerator({statusCode: 400, message: "this user is not startup user"});
  const {
    name,
    rep,
    address,
    sector,
    technology,
    businessType,
    businessLicenseNum,
    email,
    contact,
    memberCount,
    homepage,
    instagram,
    facebook,
  } = req.body;
  const { logoImg } = req.files;

  const sectorId = sector
    ? await CompanyService.getRelatedInfoId("sectors", sector)
    : undefined;
  const coreTechnologyId = technology
    ? await CompanyService.getRelatedInfoId("technologies", technology)
    : undefined;
  const businessTypeId = businessType
    ? await CompanyService.getRelatedInfoId("business_types", businessType)
    : undefined;

  const company_fields = {
    name, 
    logo_img: logoImg ? logoImg[0].location : req.body.logoImg ? req.body.logoImg : null,
    homepage,
    member_count: Number(memberCount),
  };
  const startup_connect = {
    sectors: { connect: { id: Number(sectorId) } },
    technologies: { connect: { id: Number(coreTechnologyId) } },
    business_types: { connect: { id: Number(businessTypeId) } },
  };
  const startup_field = {
    rep,
    address_road: address,
    email,
    contact,
    business_license_number: businessLicenseNum,
    instagram_url: instagram,
    facebook_url: facebook,
  };

  Object.keys(company_fields).forEach((key) =>
    company_fields[key] === undefined ? (company_fields[key] = null) : {}
  );
  Object.keys(startup_connect).forEach((key) =>
    isNaN(startup_connect[key].connect.id)
      ? (startup_connect[key] = undefined)
      : {}
  );
  Object.keys(startup_field).forEach((key) =>
    startup_field[key] === undefined ? (startup_field[key] = null) : {}
  );

  const startup_fields = { ...startup_connect, ...startup_field };

  if (!req.foundUser.company_id) {
    const companyInfo = await CompanyService.createCompany(
      req.foundUser.id,
      company_fields
    );
    await CompanyService.createCompanyDetail(companyInfo.id, 'startups', startup_fields);
  } else {
    const companyInfo = await CompanyService.updateCompany(
      req.foundUser.company_id,
      company_fields
    );
    await CompanyService.updateStartup(companyInfo.id, startup_fields);
  }

  await res.status(201).json({
    message: "startup project info saved",
  });
});

// ---------------------------------- Partner ------------------------------------
const getPartnerInfo = errorWrapper(async (req, res) => {
  if (req.foundUser.type_id === 1)
    errorGenerator({
      statusCode: 400,
      message: "this user is not partner user",
    });
  const body = {};
  if (req.foundUser.company_id) {
    const companyId = req.foundUser.company_id;
    const company = await CompanyService.findPartner({ id: companyId });

    body.name = company.name;
    body.logoImg = company.logo_img;
    body.establishedDate = company.established_date;
    body.investedCounts = company.partners[0].invested_counts;
    body.totalInvested = company.partners[0].invested_total_id
      ? await CompanyService.findInfoName(
          "investment_funds",
          company.partners[0].invested_total_id
        )
      : null;
    body.interedtedTechnology = company.partners[0].interst_technology_id
      ? await CompanyService.findInfoName(
          "technologies",
          company.partners[0].interst_technology_id
        )
      : null;
    body.homepage = company.homepage;
    body.description = company.description;
    body.teamIntro = company.team_intro;
    body.memberCount = company.member_count;
    body.members = company.company_members;
    body.news = company.company_news;

    body.investedTo = company.partners[0].invested_to;
    if (!(body.investedTo.length === 0)) {
      for (len = 0; len < body.investedTo.length; len++) {
        body.investedTo[len].investedFunds = await CompanyService.findInfoName(
          "investment_funds",
          body.investedTo[len].invested_fund_id
        );
        body.investedTo[len].investedSeries = await CompanyService.findInfoName(
          "investment_series",
          body.investedTo[len].series_id
        );
        body.investedTo[len].investedDates = `${body.investedTo[
          len
        ].date.getUTCFullYear()}.${
          body.investedTo[len].date.getUTCMonth() + 1
        }`;
        body.investedTo[len].investedValues =
          body.investedTo[len].corporate_value;
        body.investedTo[len].investedStartups =
          body.investedTo[len].invested_startup;
        delete body.investedTo[len].date;
        delete body.investedTo[len].invested_startup;
        delete body.investedTo[len].corporate_value;
        delete body.investedTo[len].invested_fund_id;
        delete body.investedTo[len].series_id;
      }
    }
    body.portfolioImages = company.partners[0].investment_portfolio;
    await res.status(200).json({
      message: "partner info",
      body,
    });
  } else if (!req.foundUser.company_id) {
    await res.status(200).json({
      message: "Company Info is not registered yet",
    });
  }
});

// Partner 기본 정보 임시저장
const tempSavePartnerBasicInfo = errorWrapper(async (req, res, next) => {
  if (req.foundUser.type_id === 1)
    errorGenerator({
      statusCode: 400,
      message: "this user is not partner user",
    });
  const {
    name,
    establishedDate,
    investedCounts,
    totalInvested,
    interedtedTechnology,
    homepage,
    description,
  } = req.body;
  let { logoImg } = req.files;

  const interedtedTechnologyId = interedtedTechnology
    ? await CompanyService.getRelatedInfoId(
        "technologies",
        interedtedTechnology
      )
    : undefined;
  const totalInvestedId = totalInvested
    ? await CompanyService.getRelatedInfoId("investment_funds", totalInvested)
    : undefined;

  const companyFields = {
    name,
    logo_img: logoImg
      ? logoImg[0].location
      : req.body.logoImg
      ? req.body.logoImg
      : null,
    established_date: await dateForm(establishedDate),
    homepage,
    description,
    company_types: { connect: { id: 2 } },
  };
  const partner_connect = {
    investment_funds: { connect: { id: totalInvestedId } },
    technologies: { connect: { id: interedtedTechnologyId } },
  };
  const partner_field = {
    invested_counts: Number(investedCounts),
  };
  Object.keys(companyFields).forEach((key) =>
    companyFields[key] === undefined ? (companyFields[key] = null) : {}
  );
  Object.keys(partner_connect).forEach((key) =>
    isNaN(partner_connect[key].connect.id)
      ? (partner_connect[key] = undefined)
      : {}
  );
  Object.keys(partner_field).forEach((key) =>
    partner_field[key] === undefined ? (partner_field[key] = null) : {}
  );
  const partnerFields = { ...partner_connect, ...partner_field };

  if (!req.foundUser.company_id) {
    const companyInfo = await CompanyService.createCompany(
      req.foundUser.id,
      companyFields
    );
    await CompanyService.createCompanyDetail(
      companyInfo.id,
      "partners",
      partnerFields
    );
  } else {
    const companyInfo = await CompanyService.updateCompany(
      req.foundUser.company_id,
      companyFields
    );
    await CompanyService.updatePartner(companyInfo.id, partnerFields);
  }

  await res.status(201).json({
    message: "startup basic info temporary saved",
  });
});

// Partner 전체 정보 임시저장
const tempSavePartnerInfo = errorWrapper(async (req, res, next) => {
  if (req.foundUser.type_id === 1)
    errorGenerator({
      statusCode: 400,
      message: "this user is not partner user",
    });
  const {
    name,
    establishedDate,
    investedCounts,
    totalInvested,
    interedtedTechnology,
    homepage,
    description,
    teamIntro,
    memberCount,
    memberInfoNames,
    memberInfoPositions,
    companyNewsURLs,
    investedTo,
  } = req.body;

  let { logoImg, portfolioImages, memberImages } = req.files;
  const interedtedTechnologyId = interedtedTechnology
    ? await CompanyService.getRelatedInfoId(
        "technologies",
        interedtedTechnology
      )
    : undefined;
  const totalInvestedId = totalInvested
    ? await CompanyService.getRelatedInfoId("investment_funds", totalInvested)
    : undefined;
  const companyFields = {
    name,
    logo_img: logoImg
      ? logoImg[0].location
      : req.body.logoImg
      ? req.body.logoImg
      : null,
    established_date: await dateForm(establishedDate),
    homepage,
    description,
    team_intro: teamIntro,
    member_count: memberCount ? Number(memberCount) : null,
    company_types: { connect: { id: 2 } },
  };
  const partner_connect = {
    investment_funds: { connect: { id: totalInvestedId } },
    technologies: { connect: { id: Number(interedtedTechnologyId) } },
  };
  const partner_field = {
    invested_counts: Number(investedCounts),
  };
  Object.keys(companyFields).forEach((key) =>
    companyFields[key] === undefined ? (companyFields[key] = null) : {}
  );
  Object.keys(partner_connect).forEach((key) =>
    isNaN(partner_connect[key].connect.id)
      ? (partner_connect[key] = undefined)
      : {}
  );
  Object.keys(partner_field).forEach((key) =>
    partner_field[key] === undefined ? (partner_field[key] = null) : {}
  );
  const partnerFields = { ...partner_connect, ...partner_field };
  let companyInfo;
  let partnerInfo;
  if (!req.foundUser.company_id) {
    companyInfo = await CompanyService.createCompany(
      req.foundUser.id,
      companyFields
    );
    partnerInfo = await CompanyService.createCompanyDetail(
      companyInfo.id,
      "partners",
      partnerFields
    );
  } else {
    companyInfo = await CompanyService.updateCompany(
      req.foundUser.company_id,
      companyFields
    );
    partnerInfo = await CompanyService.updatePartner(
      companyInfo.id,
      partnerFields
    );
  }

  // portfolio 이미지 추가
  if (portfolioImages) {
    if (
      (await CompanyService.imageLengthChecker("investment_portfolio", {
        partner_id: partnerInfo.id,
      })) +
        portfolioImages.length >
      5
    )
      errorGenerator({
        statusCode: 400,
        message: "Images Limitation Exceeded",
      });
    for (len = 0; len < portfolioImages.length; len++) {
      await CompanyService.createRelatedInfo(
        "investment_portfolio",
        (data = {
          partners: { connect: { id: partnerInfo.id } },
          img_url: portfolioImages[len].location,
        })
      );
    }
  }

  const investedToProcess = async (jsonInvestedTo) => {
    if (jsonInvestedTo.id) {
      const existData = CompanyService.readRelatedInfo("invested_to", Number(jsonInvestedTo.id));
      if (existData === []) errorGenerator({ statusCode: 400, message: "Invalid Invest Data" });
      if (existData.partner_id === partnerInfo.id) errorGenerator({ statusCode: 400, message: "this invest record is not beloged to this company" });
      await CompanyService.deleteRelatedInfo("invested_to", Number(existData.id));
    } else if (!jsonInvestedTo.id) {
      const investedFundId = await CompanyService.getRelatedInfoId("investment_funds", jsonInvestedTo.investedFunds);
      const investedSeriesId = await CompanyService.getRelatedInfoId("investment_series", jsonInvestedTo.investedSeries);
      const datesList = jsonInvestedTo.investedDates.split(".");
      const Dates = `${datesList[0]}-${datesList[1]}-01`;
      await CompanyService.createRelatedInfo(
        "invested_to",
        (data = {
          partners: { connect: { id: partnerInfo.id } },
          date: await dateForm(Dates),
          invested_startup: jsonInvestedTo.investedStartups,
          investment_funds: { connect: { id: Number(investedFundId) } },
          corporate_value: Number(jsonInvestedTo.investedValues),
          investment_series: { connect: { id: Number(investedSeriesId) } },
        })
      );
    }
  };

  // 투자 이력 추가 및 삭제
  if (investedTo) {
    const parsedInvestedTo = JSON.parse(investedTo);
    for (let len = 0; len < parsedInvestedTo.length; len++) {
      await investedToProcess(parsedInvestedTo[len]);
    }
  }

  // Team Memebr 추가
  if (memberInfoNames && memberInfoPositions && memberImages) {
    if (
      typeChecker(memberInfoNames, memberInfoPositions) === "string" &&
      memberImages.length === 1
    ) {
      await CompanyService.createRelatedInfo(
        "company_members",
        (data = {
          companies: { connect: { id: companyInfo.id } },
          name: memberInfoNames,
          img: memberImages[0].location,
          position: memberInfoPositions,
        })
      );
    } else if (
      lengthChecker(memberInfoNames, memberInfoPositions, memberImages)
    ) {
      for (len = 0; len < memberInfoNames.length; len++) {
        await CompanyService.createRelatedInfo(
          "company_members",
          (data = {
            companies: { connect: { id: companyInfo.id } },
            name: memberInfoNames[len],
            img: memberImages[len].location,
            position: memberInfoPositions[len],
          })
        );
      }
    }
  }
  // News URL 추가
  if (companyNewsURLs) {
    if (typeof companyNewsURLs === "string") {
      await CompanyService.createRelatedInfo(
        "company_news",
        (data = {
          companies: { connect: { id: companyInfo.id } },
          URL: companyNewsURLs,
        })
      );
    } else {
      for (len = 0; len < companyNewsURLs.length; len++) {
        await CompanyService.createRelatedInfo(
          "company_news",
          (data = {
            companies: { connect: { id: companyInfo.id } },
            URL: companyNewsURLs[len],
          })
        );
      }
    }
  }
  // save 기능 연결
  if (req.save) {
    next();
  } else {
    await res.status(201).json({
      message: "partner info temporary saved",
    });
  }
});

const savePartnerInfo = errorWrapper(async (req, res) => {
  const user = await UserService.findUserInfo({ id: req.foundUser.id });
  const companyId = user.company_id;

  const company = await CompanyService.readCompany(companyId);
  const partner = await CompanyService.readCompanyDetail("partners", companyId);

  if (company === null)
    errorGenerator({ statusCode: 400, message: "unidentified company data" });
  if (partner === null)
    errorGenerator({ statusCode: 400, message: "unidentified partner data" });
  if (
    !(
      company.name ||
      company.description ||
      company.logo_img ||
      partner.invested_counts ||
      partner.interst_technology_id
    )
  )
    errorGenerator({ statusCode: 400, message: "unfilled required infos" });

  CompanyService.saveInfo(companyId);

  await res.status(201).json({
    message: "partner info saved",
  });
});

const getStartups = errorWrapper(async (req, res) => {
  const [companies, num] = await CompanyService.findStartups(req.query);

  const determineLike = (liked) => {
    if (liked) {
      return liked.is_liked
    } else {
      return false
    }
  };

  if (req.loggedIn) {
    for (let len = 0; len < companies.length; len++) {
      const liked = await LikeService.findIsLiked("startup_likes", req.foundUser.id, companies[len].id);
      companies[len].is_liked = await determineLike(liked);
    };
  } else if (!req.loggedIn) {
    for (let len = 0; len < companies.length; len++) {
      companies[len].is_liked=false;
    }
  }
  res.status(200).json({ companies, num });
});

const getOnestartup = errorWrapper(async (req, res) => {
  const { companyId } = req.params;
  const company = await CompanyService.findStartup({ id: companyId });
  company.startups[0].sector = company.startups[0].sector_id
    ? await CompanyService.findInfoName(
        "sectors",
        company.startups[0].sector_id
      )
    : null;
  company.startups[0].core_technology = company.startups[0].core_technology_id
    ? await CompanyService.findInfoName(
        "technologies",
        company.startups[0].core_technology_id
      )
    : null;
  company.startups[0].investment_series = company.startups[0]
    .investment_series_id
    ? await CompanyService.findInfoName(
        "investment_series",
        company.startups[0].investment_series_id
      )
    : null;
  company.startups[0].investment_fund = company.startups[0].investment_fund_id
    ? await CompanyService.findInfoName(
        "investment_funds",
        company.startups[0].investment_fund_id
      )
    : null;
  company.startups[0].service_type = company.startups[0].service_type_id
    ? await CompanyService.findInfoName(
        "service_types",
        company.startups[0].service_type_id
      )
    : null;
  company.startups[0].business_type = company.startups[0].business_type_id
    ? await CompanyService.findInfoName(
        "business_types",
        company.startups[0].business_type_id
      )
    : null;
  for (len = 0; len < company.startups[0].invested_from.length; len++) {
    company.startups[0].invested_from[
      len
    ].invested_fund = await CompanyService.findInfoName(
      "investment_funds",
      company.startups[0].invested_from[len].invested_fund_id
    );
    company.startups[0].invested_from[
      len
    ].series = await CompanyService.findInfoName(
      "investment_series",
      company.startups[0].invested_from[len].series_id
    );
  }

  if (req.loggedIn) {
    Liked = await LikeService.findIsLiked(
      "startup_likes",
      req.foundUser.id,
      companyId
    );
    company.startups[0].is_liked = Liked ? Liked.is_liked : false;
  } else if (!req.loggedIn) {
    company.startups[0].is_liked = false;
  }

  res.status(200).json({ company });
});

const getPartners = errorWrapper(async (req, res) => {
  const [companies, num] = await CompanyService.findPartners(req.query);
  res.status(200).json({ companies, num });
});

const getOnePartner = errorWrapper(async (req, res) => {
  const { companyId } = req.params;
  const company = await CompanyService.findPartner({ id: companyId });

  if (!(company.partners[0].interst_technology_id === null)) {
    company.partners[0].interst_technology = await CompanyService.findInfoName(
      "technologies",
      company.partners[0].interst_technology_id
    );
  }
  if (!(company.partners[0].invested_total_id === null)) {
    company.partners[0].investment_total = await CompanyService.findInfoName(
      "investment_funds",
      company.partners[0].invested_total_id
    );
  }

  for (len = 0; len < company.partners[0].invested_to.length; len++) {
    company.partners[0].invested_to[
      len
    ].invested_fund = await CompanyService.findInfoName(
      "investment_funds",
      company.partners[0].invested_to[len].invested_fund_id
    );
    company.partners[0].invested_to[
      len
    ].series = await CompanyService.findInfoName(
      "investment_series",
      company.partners[0].invested_to[len].series_id
    );
  }

  if (req.loggedIn) {
    const liked = await LikeService.findIsLiked(
      "partner_likes",
      req.foundUser.id,
      companyId
    );
    company.partners[0].is_liked = liked ? liked.is_liked : false;
  } else if (!req.loggedIn) {
    company.partners[0].is_liked = false;
  }

  res.status(200).json({ company });
});

const likeCompany = errorWrapper(async (req, res) => {
  const { companyId } = req.params;
  const userId = req.foundUser.id;
  const where = {
    user_id: Number(userId),
    company_id: Number(companyId),
  };
  const data = {
    users: { connect: { id: Number(userId) } },
    companies: { connect: { id: Number(companyId) } },
  };
  const { type_id } = await CompanyService.readCompany(Number(companyId));
  let object;

  if (type_id === 1) {
    object = "startup_likes";
  } else if (type_id === 2) {
    if (req.foundUser.type_id === 2)
      errorGenerator({
        statusCode: 400,
        message: "partner user can't like other partners",
      });
    object = "partner_likes";
  }

  const like = await LikeService.like(object, where, data);
  await res.status(201).json({
    message: "Company Like Updated",
    result: like.is_liked,
  });
});

const startupIRCount = errorWrapper(async (req, res) => {
  const { companyId } = req.params;
  const countingRegisteredIR = await CompanyService.irRegisteredCount({
    id: companyId,
  });
  const countingSentIR = await CompanyService.irSentCount({ id: companyId });
  const countingRequestedIR = await CompanyService.irRequestedCount({
    id: companyId,
  });
  res.status(200).json({
    countingRegisteredIR,
    countingSentIR,
    countingRequestedIR,
  });
});


module.exports = {
  getStartupInfo,
  tempSaveStartupInfo,
  tempSaveStartupBasicInfo,
  saveStartupInfo,
  getStartupSubmitInfo,
  saveStartupSubmitInfo,

  getPartnerInfo,
  tempSavePartnerBasicInfo,
  tempSavePartnerInfo,
  savePartnerInfo,

  getStartups,
  getPartners,
  getOnePartner,
  getOnestartup,

  likeCompany,

  deleteMember,
  deleteImage,
  deleteNews,

  startupIRCount
};
