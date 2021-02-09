const { body } = require("express-validator");
const { errorGenerator } = require("../errors");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

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
  where.project_id = projectId

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

  return prisma.applicants.findUnique({
    where: {
      [uniqueKey]: value,
    },
  });
};

const findMyApplication = (where) => {
  return prisma.applicants.findFirst({ where });
};

const createApplication = async (data, files) => {
  const { businessPlan, businessLicense, repID, IRdocuments, etc } = files

  // application 생성
  const application = await prisma.applicants.create({ data });

  // 파일 처리
  const requiredDoc = findRequiredDoc(application.project_id)
  const incomeDoc = Object.keys(files)

  // applicant_document 생성
  if (incomeDoc) {
    for (let len=0; len < incomeDoc.length; len++) {
      const companyDocument = await prisma.company_documents.findFirst({
        where: id = Number(incomeDoc[len])
      })
        if (!(companyDocument.company_id === userInfo.company_id)) errorGenerator({ statusCode: 400, message: "This Document is not Belonged to This Company" });
        if (companyDocument === []) errorGenerator({ statusCode: 400, message: "Undefined Document Id" });
        await prisma.applicant_documents.create({
          data: {
            applicants: { connect: { id: application.id } },
            company_documents: { connect: { id: companyDocument.id } },
          },
        });
      }
    }
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
};
