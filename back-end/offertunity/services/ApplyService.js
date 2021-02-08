const { body } = require("express-validator");
const { errorGenerator } = require("../errors");
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

const findMyApplication = (field) => {
  return prisma.applicants.findFirst({ where });
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
    userInfo,
    companyDocumentIds,
    requestFields,
  } = fields;

  // application 생성
  const application = await prisma.applicants.create({
    data: {
      ...requestFields,
      companies: { connect: { id: Number(userInfo.com.company_id) } },
      projects: { connect: { id: Number(projectId) } },
    },
  });

  // project의 related Document find
  const requiredDocuments = await prisma.required_documents.findMany({
    where: {
      project_id: projectId
    }
  });
  const requiredDoc = []
  for (let len=0; len<requiredDocuments.length; len++) {
    requiredDoc.push(requiredDocuments[len].document_id)
  };

  // applicant_document 생성
  if (companyDocumentIds) {
    if (typeof companyDocumentIds === 'string') {
      const companyDocument = await prisma.company_documents.findFirst({
        where: id = Number(companyDocumentIds)
      })
      if (!companyDocument.company_id === userInfo.company_id) errorGenerator({ statusCode: 400, message: "This Document Belonged to This Company" });
      if (companyDocument === []) errorGenerator({ statusCode: 400, message: "Undefined Document Id" });
      await prisma.applicant_documents.create({
        data: {
          applicants: {connect: {id: application.id}},
          company_documents: {connect: {id: companyDocument.id}}
        }
      })
    } else if (typeof companyDocumentIds === 'object'){
      for (let len=0; len<companyDocumentIds.length; len++) {
        const companyDocument = await prisma.company_documents.findFirst({
          where: id = Number(companyDocumentIds[len])
        })  
        if (!(companyDocument.company_id === userInfo.company_id)) errorGenerator({ statusCode: 400, message: "This Document Belonged to This Company" });
        if (companyDocument === []) errorGenerator({ statusCode: 400, message: "Undefined Document Id" });
        await prisma.applicant_documents.create({
          data: {
            applicants: {connect: {id: application.id}},
            company_documents: {connect: {id: companyDocument.id}}
          }
        })  
      }
    }
  };
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
  findMyApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
