const { body } = require("express-validator");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");
const { forloop } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findProjects = (query) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);

  return prisma.projects.findMany({
    where,
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "asc",
    },
  });
};

const findOneProject = (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.projects.findUnique({ where: { [uniqueKey]: value } });
};

const resetChoices = async (field) => {
  console.log("sdfsdf");
  const { projectAction } = field;
  return await prisma.required_documents.deleteMany({
    where: {
      projects: {
        id: Number(projectAction.id),
      },
    },
  });
};

const createRelatedDoc = async (fields) => {
  const { required_documents, projectAction } = fields;

  return await prisma.required_documents.create({
    data: {
      document_types: { connect: { id: Number(required_documents[len]) } },
      projects: { connect: { id: Number(projectAction.id) } },
    },
  });
};

const createProject = async (fields) => {
  const {
    userInfofromToken,
    requestedFields,
    project_picture,
    due_date,
  } = fields;
  requestedFields.required_documents = undefined;
  return await prisma.projects.create({
    data: {
      ...requestedFields,
      companies: { connect: { id: Number(userInfofromToken.company_id) } },
      eligibilities: requestedFields.eligibilities
        ? { connect: { id: Number(requestedFields.eligibilities) } }
        : undefined,
      sectors: requestedFields.sectors
        ? { connect: { id: Number(requestedFields.sectors) } }
        : undefined,
      is_opened: 0,
      hit: 0,
      project_images: project_picture
        ? { create: [{ img_url: project_picture }] }
        : undefined,
      due_date,
    },
  });
};

const updateProject = async (fields) => {
  const { projectId, requestedFields, project_picture, due_date } = fields;
  requestedFields.required_documents = undefined;

  return await prisma.projects.update({
    where: {
      id: Number(projectId),
    },
    data: {
      ...requestedFields,
      eligibilities: requestedFields.eligibilities
        ? { connect: { id: Number(requestedFields.eligibilities) } }
        : undefined,
      sectors: requestedFields.sectors
        ? { connect: { id: Number(requestedFields.sectors) } }
        : undefined,
      project_images: project_picture
        ? { create: [{ img_url: project_picture }] }
        : undefined,
      updated_at: new Date(),
      due_date,
    },
  });
};

const openProject = (projectId) => {
  return prisma.projects.update({
    where: {
      id: Number(projectId),
    },
    data: {
      is_opened: 1,
      updated_at: new Date(),
    },
  });
};

const deleteProject = (projectId) => {
  return prisma.projects.update({
    where: {
      id: Number(projectId),
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

module.exports = {
  findProjects,
  findOneProject,
  resetChoices,
  createRelatedDoc,
  createProject,
  updateProject,
  openProject,
  deleteProject,
};
