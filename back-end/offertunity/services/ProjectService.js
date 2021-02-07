const { body } = require("express-validator");
const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;


const findPublishedProjects = (query, field) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);

  return prisma.projects.findMany({
    include: {
        project_images: true
        },
      where,
    //   skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    //   take: Number(limit) || ARTICLES_DEFAULT_LIMIT,

      orderBy: {
          created_at: "asc",
      },
  });
};


const findMyProjects = (query, companyId) => {
    const { offset, limit, ...fields } = query;
    const where = makeQueryOption(fields);
    delete where.AND[0]
    where.company = companyId

    return prisma.projects.findMany({
        include: {
            project_images: true
            },
        where,
        // skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
        // take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
        orderBy: {
            created_at: "asc",
        },
    });
};



const findOneProject = (field) => {
    const [uniqueKey] = Object.keys(field);
    const isKeyId = uniqueKey === "id";
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];
    return prisma.projects.findUnique({
        include: {
            project_images: true
            },
        where: {
            [uniqueKey]: value },
    });
};

const resetChoices = async(field) => {
    const { projectAction } = field;
    return await prisma.required_documents.deleteMany({
        where: {
            projects: {
                id: Number(projectAction.id),
            },
        },
    });
};

const createRelatedDoc = async(fields) => {
    const { required_documents, projectAction } = fields;

    return await prisma.required_documents.create({
        data: {
            document_types: { connect: { id: Number(required_documents[len]) } },
            projects: { connect: { id: Number(projectAction.id) } },
        },
    });
};

const createProject = async(fields) => {
    const {
        requestedFields,
        project_picture,
        due_date,
        eligible_sectors,
        eligibilities
    } = fields;
    requestedFields.required_documents = undefined;
    requestedFields.eligibility = undefined;
    requestedFields.eligible_sectors = undefined

// console.log(userInfofromToken)
    return await prisma.projects.create({
        data: {
            companies: userInfofromToken? { connect: { id: userInfofromToken.company_id } } : undefined,
            ...requestedFields,
            eligibilities: eligibilities ? { connect: { id: eligibilities.id } } : undefined,
            eligible_sectors: eligible_sectors ? { connect: { id: eligible_sectors.id } } : undefined,
            is_opened: 0,
            is_saved: false,
            hit: 0,
            project_images: project_picture ? { create: [{ img_url: project_picture }] } : undefined,
            due_date,
        },
    });
};

const updateProject = async(fields) => {
    const { projectId, requestedFields, project_picture, due_date } = fields;
    requestedFields.required_documents = undefined;

    return await prisma.projects.update({
        where: {
            id: Number(projectId),
        },
        data: {
            ...requestedFields,
            eligibilities: requestedFields.eligibilities ? { connect: { id: Number(requestedFields.eligibilities) } } : undefined,
            sectors: requestedFields.sectors ? { connect: { id: Number(requestedFields.sectors) } } : undefined,
            project_images: project_picture ? { create: [{ img_url: project_picture }] } : undefined,
            updated_at: new Date(),
            due_date,
        },
    });
};

const saveInfo = (async(field) => {
  const { projectId } = field;

  return await prisma.projects.update({
      where: { id: Number(projectId) },
      data: { is_saved: true }
  })
})

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
    findPublishedProjects,
    findMyProjects,
    findOneProject,
    resetChoices,
    createRelatedDoc,
    createProject,
    updateProject,
    saveInfo,
    openProject,
    deleteProject,
};