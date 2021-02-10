const { body } = require("express-validator");
const { errorGenerator } = require("../errors");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");
const CompanyService = require("./CompanyService");

const findRequiredDoc = async (proejctId) => {
  const requiredDocuments = await prisma.required_documents.findMany({
    where: {
      project_id: proejctId,
    }
  });
  const requiredDoc = []
  for (let len=0; len<requiredDocuments.length; len++) {
    requiredDoc.push(requiredDocuments[len].document_id)
  };
  return requiredDoc
}

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findApplications = (query, projectId) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  where.project_id = Number(projectId)
  delete where.AND[0]

  return prisma.applicants.findMany({
    where,
    include: {
      companies: {
        include: {
          startups: true
        }
      }
    },
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "asc",
    },
  });
};

const findOneApplication = async (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  console.log(uniqueKey, value, typeof value)

  const application = await prisma.applicants.findUnique({
    where: { [uniqueKey] : value },
    include: {
      companies: {
        include: {
          startups: true,
        }
      },
      applicant_documents: {
        include: {
          company_documents: true
        }
      }
    }
  });
  console.log(application)
  return application
};

const findMyApplication = async (where) => {
  return prisma.applicants.findFirst({ 
    where,
    include: {
      applicant_documents: {
        include: {
          company_documents: true
        }
      }
    }
  });
};

const findDocuments = async (query, companyId) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  where.company_id = Number(companyId)
  delete where.AND[0]
  return prisma.company_documents.findMany({
    where
  })
}

const createApplication = (data, files) => {
  return prisma.applicants.create({ data });
};

const createApplicationDocument = (data, files) => {
  return prisma.applicant_documents.create({ data });
};

const updateApplication = (data, applicationId) => {
  return prisma.applicants.update({
    where: { id: Number(applicationId) },
    data
  });
};

const deleteApplication = (applicationId) => {
  return prisma.applicants.delete({
    where: {
      id: Number(applicationId),
    },
  });
};


module.exports = {
  findApplications,
  findOneApplication,
  findMyApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  findDocuments,
  createApplicationDocument
};
