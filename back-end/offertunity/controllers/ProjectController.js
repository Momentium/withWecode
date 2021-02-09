require("dotenv").config();
const { AUTH_TOKEN_SALT } = process.env;
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dateForm } = require("../utils");
const { ProjectService, LikeService, ApplyService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const getPublishedProjects = errorWrapper(async (req, res) => {
  const projectList = await ProjectService.findPublishedProjects(req.query);
  res.status(200).json({ projectList });
});

const getMyProjects = errorWrapper(async (req, res) => {
  const userInfofromToken = req.foundUser;

  const projectList = await ProjectService.findMyProjects(
    req.query,
    userInfofromToken.company_id
  );
  res.status(200).json({ projectList });
});

const getOneProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const projectDetail = await ProjectService.findOneProject({ id: projectId });
  let hasApplied;
  const userInfofromToken = req.foundUser ? req.foundUser : undefined;
  if (userInfofromToken) {
    const isStartup = userInfofromToken.type_id === 1;
    const findApplied = isStartup
      ? await ApplyService.findRelatedApplication({
          company_id: userInfofromToken.company_id,
          project_id: Number(projectId),
        })
      : false;
    console.log(findApplied);
    hasApplied = findApplied ? true : false;
  } else {
    hasApplied = false;
  }

  res.status(200).json({ projectDetail, hasApplied });
});

const startNewProject = errorWrapper(async (req, res) => {
  const userInfofromToken = req.foundUser;
  const projectAction = await ProjectService.createProject({
    userInfofromToken,
  });
  res
    .status(201)
    .json({ message: "new project created", projectID: projectAction.id });
});

const tempSaveProjectInfo = errorWrapper(async (req, res, next) => {
  const { projectId } = req.params;
  const userInfofromToken = req.foundUser;
  const requestedFields = req.body;

  const foundProject = await ProjectService.findOneProject({ id: projectId });
  if (!foundProject)
    errorGenerator({ statusCode: 404, message: "project not found" });
  const { company: companyIdfromProject } = foundProject;

  if (userInfofromToken.company_id !== companyIdfromProject)
    errorGenerator({ statusCode: 403, message: "unauthorized" });

  const required_documents = requestedFields.required_documents
    ? requestedFields.required_documents
    : null;
  const due_date = await dateForm(requestedFields.due_date);

  const projectDetail = await ProjectService.findOneProject({ id: projectId });
  const project_picture = req.file
    ? req.file.location
    : projectDetail.project_images
    ? projectDetail.project_images.img_url
    : null;
  const eligible_sectors = (await requestedFields.eligible_sectors)
    ? await prisma.eligible_sectors.findUnique({
        where: {
          name: String(requestedFields.eligible_sectors),
        },
      })
    : undefined;
  const eligibilities = requestedFields.eligibilities
    ? await prisma.eligibilities.findUnique({
        where: {
          name: String(requestedFields.eligibilities),
        },
      })
    : undefined;

  const projectAction = await ProjectService.updateProject({
    projectId,
    requestedFields,
    due_date,
    project_picture,
    eligible_sectors,
    eligibilities,
  });

  await ProjectService.resetChoices({ projectAction });
  if (required_documents) {
    for (len = 0; len < required_documents.length; len++) {
      await ProjectService.createRelatedDoc({
        required_documents,
        projectAction,
      });
    }
  } else {
  }
  if (req.save) {
    next();
  } else {
    res.status(201).json({
      message: "project info temporarily saved",
      ProjectId: projectAction.id,
    });
  }
});

const deleteProjectPic = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userInfofromToken = req.foundUser;

  const foundProject = await ProjectService.findOneProject({ id: projectId });
  if (!foundProject)
    errorGenerator({ statusCode: 404, message: "project not found" });
  const { company: companyIdfromProject } = foundProject;

  if (userInfofromToken.company_id !== companyIdfromProject)
    errorGenerator({ statusCode: 403, message: "unauthorized" });

  await ProjectService.deleteImage({ projectId });
  res.status(201).json({
    message: "project picture successfully deleted",
  });
});

const saveProjectInfo = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  await ProjectService.saveInfo({ projectId });
  res.status(201).json({ message: "information successfully saved" });
});

const openOneProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userInfofromToken = req.foundUser;

  const foundProject = await ProjectService.findOneProject({ id: projectId });
  if (!foundProject)
    errorGenerator({ statusCode: 404, message: "project not found" });

  if (userInfofromToken.type_id !== 3)
    errorGenerator({ statusCode: 403, message: "unauthorized" });

  await ProjectService.openProject(projectId);
  res.status(201).json({ message: "information successfully opened" });
});

const deleteOneProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userInfofromToken = req.foundUser;

  const foundProject = await ProjectService.findOneProject({ id: projectId });
  if (!foundProject)
    errorGenerator({ statusCode: 404, message: "project not found" });
  const { host: companyIdfromProject } = foundProject;

  if (
    userInfofromToken.company_id == companyIdfromProject ||
    userInfofromToken.type_id == 3
  ) {
    await ProjectService.deleteProject(projectId);
    res.status(201).json({ message: "information successfully deleted" });
  } else errorGenerator({ statusCode: 403, message: "unauthorized" });
});

const likeProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.foundUser.id;
  const where = {
    user_id: Number(userId),
    company_id: Number(projectId),
  };
  const data = {
    users: { connect: { id: Number(userId) } },
    companies: { connect: { id: Number(projectId) } },
  };
  const like = await LikeService.like("project_likes", where, data);
  res.status(201).json({
    message: "Project Like Updated",
    result: like.is_liked,
  });
});

module.exports = {
  getPublishedProjects,
  getMyProjects,
  getOneProject,
  startNewProject,
  tempSaveProjectInfo,
  saveProjectInfo,
  openOneProject,
  deleteProjectPic,
  deleteOneProject,
  likeProject,
};
