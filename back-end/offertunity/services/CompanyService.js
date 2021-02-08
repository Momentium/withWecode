const { upsertConnection, makeQueryOption, calcYear } = require("../utils");
const prisma = require("../prisma");

const createCompany = async (userId, companyFields) => {
  const companyInfo = await prisma.companies.create({ data: companyFields });
  await prisma.users.update({
    where: { id: userId },
    data: { companies: { connect: { id: companyInfo.id } } },
  });
  return companyInfo;
};

const readCompany = async (companyId) => {
  return await prisma.companies.findUnique({ where: { id: companyId } });
};

const updateCompany = async (companyId, companyFields) => {
  const companyInfo = await prisma.companies.update({
    where: { id: companyId },
    data: companyFields,
  });
  return companyInfo;
};

const createCompanyDetail = async (companyId, table, fields) => {
  fields.companies = { connect: { id: companyId } };
  return await prisma[table].create({ data: fields });
};

const readCompanyDetail = async (table, companyId) => {
  return await prisma[table].findUnique({ where: { company_id: companyId } });
};

const updateStartup = async (companyId, startupFields) => {
  const startupInfo = await readCompanyDetail("startups", companyId);
  const updatedStartupInfo = await prisma.startups.update({
    where: { id: startupInfo.id },
    data: {
      ...startupFields,
      ...upsertConnection(
        "technologies",
        startupInfo.core_technology_id,
        startupFields.technologies
      ),
      ...upsertConnection(
        "sectors",
        startupInfo.sector_id,
        startupFields.sectors
      ),
      ...upsertConnection(
        "investment_funds",
        startupInfo.investment_fund_id,
        startupFields.investment_funds
      ),
      ...upsertConnection(
        "investment_series",
        startupInfo.investment_series_id,
        startupFields.investment_series
      ),
    },
  });
  return updatedStartupInfo;
};

const updatePartner = async (companyId, partnerFields) => {
  const partnerInfo = await readCompanyDetail("partners", companyId);
  const updatedStartupInfo = await prisma.partners.update({
    where: { id: partnerInfo.id },
    data: {
      ...partnerFields,
      ...upsertConnection(
        "technologies",
        partnerInfo.core_technology_id,
        partnerFields.technologies
      ),
      ...upsertConnection(
        "investment_funds",
        partnerInfo.investment_fund_id,
        partnerFields.investment_funds
      ),
    },
  });
  return updatedStartupInfo;
};

const checkExistence = async (table, data) => {
  if ((await prisma[table].findMany({ where: data })).length > 0) {
    return true;
  } else {
    return false;
  }
};

const checkWishInvestmentSeries = async (startupId) => {
  return await prisma.wish_investment_series.findMany({
    where: { startup_id: startupId },
  });
};

const createWishInvestmentSeries = async (data) => {
  await prisma.wish_investment_series.create({
    data: data,
  });
};

const updateWishInvestmentSeries = async (id, data) => {
  await prisma.wish_investment_series.update({
    where: { id: id },
    data: data,
  });
};

const deleteWishInvestmentSeries = async (id) => {
  await prisma.wish_investment_series.delete({
    where: { id },
  });
};

const createRelatedInfo = async (table, data) => {
  await prisma[table].create({
    data: data,
  });
};

const deleteRelatedInfo = async (table, id) => {
  await prisma[table].delete({
    where: { id },
  });
};

const saveInfo = async (companyId) => {
  await prisma.companies.update({
    where: { id: companyId },
    data: { is_saved: true },
  });
};

const findStartups = async (query) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  where.type_id = 1;

  const ARTICLES_DEFAULT_OFFSET = 0;
  const ARTICLES_DEFAULT_LIMIT = 16;

  const companies = await prisma.companies.findMany({
    include: {
      startups: true,
    },
    where,
    skip: (Number(offset) - 1) * Number(limit) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      id: "desc",
    },
  });
  const num = (
    await prisma.companies.findMany({
      where,
    })
  ).length;

  for (let len = 0; len < companies.length; len++) {
    companies[len].tag = [];
    if (companies[len].startups[0].sector_id) {
      companies[len].tag.push(
        await findInfoName("sectors", companies[len].startups[0].sector_id)
      );
    }
    if (companies[len].startups[0].core_technology_id) {
      companies[len].tag.push(
        await findInfoName(
          "technologies",
          companies[len].startups[0].core_technology_id
        )
      );
    }
    if (companies[len].startups[0].investment_series_id) {
      companies[len].tag.push(
        await findInfoName(
          "investment_series",
          companies[len].startups[0].investment_series_id
        )
      );
    }
    if (companies[len].established_date) {
      companies[len].tag.push(await calcYear(companies[len].established_date));
    }
  }

  return [companies, num];
};

const findStartup = async (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  const startup = await prisma.companies.findUnique({
    where: {
      [uniqueKey]: value,
    },
    include: {
      startups: {
        include: {
          startup_images: true,
          invested_from: true,
          wish_investment_series: true,
        },
      },
      company_news: true,
      company_members: true,
    },
  });

  startup.tag = [];
  if (startup.startups[0].sector_id) {
    startup.tag.push(
      await findInfoName("sectors", startup.startups[0].sector_id)
    );
  }
  if (startup.startups[0].core_technology_id) {
    startup.tag.push(
      await findInfoName("technologies", startup.startups[0].core_technology_id)
    );
  }
  if (startup.startups[0].investment_series_id) {
    startup.tag.push(
      await findInfoName(
        "investment_series",
        startup.startups[0].investment_series_id
      )
    );
  }
  if (startup.established_date) {
    startup.tag.push(await calcYear(startup.established_date));
  }

  return startup;
};

const findPartners = async (query) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  where.type_id = 2;
  const ARTICLES_DEFAULT_OFFSET = 0;
  const ARTICLES_DEFAULT_LIMIT = 12;
  const companies = await prisma.companies.findMany({
    include: {
      partners: true,
    },
    where,
    skip: (Number(offset) - 1) * Number(limit) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      id: "desc",
    },
  });
  const num = (
    await prisma.companies.findMany({
      where,
    })
  ).length;

  for (let len = 0; len < companies.length; len++) {
    companies[len].tag = [];
    if (companies[len].partners[0].invested_total_id) {
      companies[len].tag.push(
        await findInfoName(
          "investment_funds",
          companies[len].partners[0].invested_total_id
        )
      );
    }
    if (companies[len].partners[0].interst_technology_id) {
      companies[len].tag.push(
        await findInfoName(
          "technologies",
          companies[len].partners[0].interst_technology_id
        )
      );
    }
    if (companies[len].established_date) {
      companies[len].tag.push(await calcYear(companies[len].established_date));
    }
  }

  return [companies, num];
};

const findPartner = async (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  const partner = await prisma.companies.findUnique({
    where: {
      [uniqueKey]: value,
    },
    include: {
      partners: {
        include: {
          investment_portfolio: true,
          invested_to: true,
        },
      },
      company_news: true,
      company_members: true,
    },
  });

  partner.tag = [];
  if (partner.partners[0].invested_total_id) {
    partner.tag.push(
      await findInfoName(
        "investment_funds",
        partner.partners[0].invested_total_id
      )
    );
  }
  if (partner.partners[0].interst_technology_id) {
    partner.tag.push(
      await findInfoName(
        "technologies",
        partner.partners[0].interst_technology_id
      )
    );
  }
  if (partner.established_date) {
    partner.tag.push(await calcYear(partner.established_date));
  }

  return partner;
};

const imageLengthChecker = async (table, where) => {
  const images = await prisma[table].findMany({
    where,
  });
  return images.length;
};

const findInfoName = async (table, id) => {
  const info = await prisma[table].findUnique({
    where: { id },
  });
  return info.name;
};

const readRelatedInfo = (table, id) => {
  return prisma[table].findUnique({
    where: { id },
  });
};

const getRelatedInfoId = async (table, name) => {
  const data = await prisma[table].findFirst({
    where: { name },
  });
  return data.id;
};

const irRegisteredCount = async (field) => {
  companyId = Object.values(field)[0];
  return prisma.$queryRaw`select count(*) from company_documents where company_id = ${companyId} && type_id = 1;`;
};

const irSentCount = async (field) => {
  startupId = Object.values(field)[0];
  return prisma.$queryRaw`select count(*) from IR_requests where startup_id = ${startupId} && document_id is not null;`;
};

const irRequestedCount = async (field) => {
  startupId = Object.values(field)[0];
  return prisma.$queryRaw`select count(*) from IR_requests where startup_id = ${startupId} && is_sent=1 && is_checked = 0;`;
};

const readByDocType = async (fields) => {
  const { companyId, docTypeId } = fields;
  return await prisma.company_documents.findMany({
    where: { comapny_id: companyId, type_id: docTypeId },
  });
};

const registerDoc = async (fields) => {
  const { companyId, docTypeId, startupDoc } = fields;

  return await prisma.company_documents.create({
    data: {
      companies: { connect: { id: parseInt(companyId) } },
      doc_url: startupDoc,
      document_types: { connect: { id: parseInt(docTypeId) } },
    },
  });
};

const deleteDoc = async (fields) => {
  const { company_id, doc_url, type_id } = fields;
  return await prisma.company_documents.delete({
    where: {
      company_id: company_id,
      doc_url: doc_url,
      type_id: type_id,
    },
  });
};

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
  findPartners,
  findPartner,
  findStartup,
  imageLengthChecker,
  findInfoName,
  readRelatedInfo,
  getRelatedInfoId,
  irRegisteredCount,
  irSentCount,
  irRequestedCount,
  readByDocType,
  registerDoc,
  deleteDoc,
};
