const { body } = require("express-validator");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findApplications = (query) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);

  return prisma.applicants.findMany({
    where,
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "asc",
    },
  });
};

const findOneApplication = (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.applicants.findUnique({ where: {
    [uniqueKey]: value } });
};

const findRelatedApplication = (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "companies";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.applicants.findMany({ where: { 
    [uniqueKey]: {id: value } } } );
};

const createApplication = async (fields) => {
  const {
    projectId,
    userInfofromToken,
    requestedFields,
  } = fields;
  return await prisma.applicants.create({
    data: {
      ...requestedFields,
      companies: { connect: { id: Number(userInfofromToken.com.company_id) } },
      projects: { connect: { id: Number(projectId) } },
    },
  });
};

const updateApplication = async (fields) => {
  const { applicationId, requestedFields, userInfofromToken } = fields;

  return await prisma.applicants.update({
    where: {
      id: Number(applicationId),
    },
    data: {
      ...requestedFields,
    },
  });
};

const deleteApplication = (projectId) => {
  return prisma.projects.delete({
    where: {
      id: Number(projectId),
    },
  });
};

module.exports = {
  findApplications,
  findOneApplication,
  findRelatedApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
