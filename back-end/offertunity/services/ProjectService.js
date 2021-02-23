const { body } = require("express-validator");
const { project_images } = require("../prisma");
const prisma = require("../prisma");
const { makeQueryOption, calcDue } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findPublishedProjects = async (query, field) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  where.AND[2]= {is_opened : true}

  const projects = await prisma.projects.findMany({
    include: {
      project_images: {
        select: {
          img_url: true,
        },
      },
      eligible_sectors: {
        select: {
          name: true,
        },
      },
      eligibilities: {
        select: {
          name: true,
        },
      },
      required_documents: {
        include: {
          document_types: {
            select: {
            name: true
          }
        }
        }
      }
    },
    where,
    //   skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    //   take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "asc",
    },
  });
  console.log(projects);

  for (let x = 0; x < projects.length; x++) {
    projects[x].tag = [];
    projects[x].tag.push(projects[x].eligible_sectors["name"]);
    projects[x].tag.push(projects[x].eligibilities["name"]);
    projects[x].tag.push(await calcDue(projects[x].due_date));
  }
  return projects;
};

const findMyProjects = (query, companyId) => {
  const { offset, limit, ...fields } = query;
  const where = makeQueryOption(fields);
  delete where.AND[0];
  where.company_id = companyId;

  return prisma.projects.findMany({
    include: {
      project_images: {
        select: {
          img_url: true,
        },
      },
      eligible_sectors: {
        select: {
          name: true,
        },
      },
      eligibilities: {
        select: {
          name: true,
        },
      },
      required_documents: {
        include: {
          document_types: {
            select: {
            name: true
          }
        }
        }
      }
    },
    where,
    // skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    // take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "asc",
    },
  });
  
};

const findOneProject = async (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];
  console.log(field);
  const projects = await prisma.projects.findUnique({
    where: {
      [uniqueKey]: value,
    },
  });
  const cleanedProject = await prisma.projects.update({
    include: {
      project_images: {
        select: {
          img_url: true,
        },
      },
      eligible_sectors: {
        select: {
          name: true,
        },
      },
      eligibilities: {
        select: {
          name: true,
        },
      },
      required_documents: {
        include: {
          document_types: {
            select: {
            name: true
          }
        }
        }
      }
    },
    where: {
      [uniqueKey]: value,
    },
    data: {
      hit: projects.hit + 1,
    },
  });

  cleanedProject.tag = [];
  cleanedProject.tag.push(cleanedProject.eligible_sectors["name"]);
  cleanedProject.tag.push(cleanedProject.eligibilities["name"]);
  cleanedProject.tag.push(await calcDue(cleanedProject.due_date));

  return cleanedProject;
};

const resetChoices = async (field) => {
  const { projectDetail } = field;
  return await prisma.required_documents.deleteMany({
    where: {
      projects: {
        id: Number(projectDetail.id),
      },
    },
  });
};

const createRelatedDoc = async (requiredDocId, projectAction) => {
  return await prisma.required_documents.create({
    data: {
      document_types: { connect: { id: Number(requiredDocId) } },
      projects: { connect: { id: Number(projectAction.id) } },
    },
  });
};

const createProject = async (field) => {
  const { userInfofromToken } = field;
  return await prisma.projects.create({
    data: {
      companies: userInfofromToken
        ? { connect: { id: userInfofromToken.company_id } }
        : undefined,
      is_opened: false,
      is_saved: false,
      request_open: false,
      hit: 0,
    },
  });
};

const updateProject = async (fields) => {
  const {
    projectId,
    name,
    introduction,
    host,
    due_date,
    eligible_sectors,
    eligibilities,
    outline,
    detail,
    application_method,
    caution,
    contact,
    application_url,
    project_images,
  } = fields;

  return await prisma.projects.update({
    where: {
      id: Number(projectId),
    },
    data: {
      name,
      introduction,
      host,
      due_date,
      eligible_sectors: eligible_sectors? { connect: { id: eligible_sectors } }: undefined,      
      eligibilities: eligibilities? { connect: { id: eligibilities } }: undefined,
      outline,
      detail,
      application_method,
      caution,
      contact,
      application_url,
      project_images: project_images? { create: [{ img_url: project_images }] }: undefined,
      is_saved: true,
    },
  });
};

const openRequest = async (field) => {
  const { projectId } = field;

  return await prisma.projects.update({
    where: { id: Number(projectId) },
    data: { request_open: true },
  });
};

const openProject = (projectId) => {
  return prisma.projects.update({
    where: {
      id: Number(projectId),
    },
    data: {
      is_opened: true,
      updated_at: new Date(),
    },
  });
};

const deleteImage = async (field) => {
  const { projectId } = field;
  return await prisma.project_images.deleteMany({
    where: {
      project_id: Number(projectId),
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
  openProject,
  openRequest,
  deleteImage,
  deleteProject,
};
