require("dotenv").config();
const prisma = require("../prisma");
const { dateForm } = require("../utils");
const { ProjectService, LikeService, ApplyService, CompanyService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");
const { readRelatedInfo } = require("../services/CompanyService");
const { required_documents } = require("../prisma");

const getPublishedProjects = errorWrapper(async (req, res) => {
  const projectList = await ProjectService.findPublishedProjects(req.query);
  let cleanedProjectList = [];

  if (projectList.length>0) {for(let len=0; len<projectList.length;len++){
    const id = projectList[len].id? projectList[len].id:null;
    const name = projectList[len].name? projectList[len].name: null;
    const introduction = projectList[len].introduction? projectList[len].introduction:null;
    const host = projectList[len].host? projectList[len].host:null;
    const due_date = await dateForm(projectList[len].due_date);
    const eligible_sectors = projectList[len].eligible_sectors? projectList[len].eligible_sectors.name : null;
    const eligibilities = projectList[len].eligibilities? projectList[len].eligibilities.name:null;
    const outline = projectList.outline? requestedFields.outline:null;  
    const detail = projectList[len].detail? projectList[len].detail : null;
    const application_method = projectList[len].application_method? projectList[len].application_method : null;
    const caution = projectList[len].caution? projectList[len].caution : null;
    const contact = projectList[len].contact? projectList[len].contact : null;
    const application_url = projectList[len].application_url? projectList[len].application_url : null;
    const project_images = projectList[len].project_images.length>0? projectList[len].project_images[0].img_url: null;
    const reqDocExists = projectList[len].required_documents? projectList[len].required_documents: undefined;
    const required_documents = reqDocExists.length > 0 ? reqDocExists.map((el) => el.document_types.name) : reqDocExists;
    const tag = projectList[len].tag? projectList[len].tag: undefined;

  let hasLiked;
  const userInfofromToken = req.foundUser ? req.foundUser : undefined;
  if (userInfofromToken) {
    const isStartup = userInfofromToken.type_id === 1;
    const findLiked = isStartup? await LikeService.findIsLiked("project_likes",userInfofromToken.user_id, id ):false;
    hasLiked = findLiked? true : false;
  }else{
    hasLiked = false
  }
  let cleanedProject = {};
  cleanedProject.id = id
  cleanedProject.name = name
  cleanedProject.introduction = introduction
  cleanedProject.host = host
  cleanedProject.due_date = due_date
  cleanedProject.eligible_sectors = eligible_sectors
  cleanedProject.eligibilities = eligibilities
  cleanedProject.outline = outline
  cleanedProject.detail = detail
  cleanedProject.application_method = application_method
  cleanedProject.caution = caution
  cleanedProject.contact = contact
  cleanedProject.application_url = application_url
  cleanedProject.project_images = project_images
  cleanedProject.required_documents = required_documents
  cleanedProject.tag = tag
  cleanedProject.hasLiked = hasLiked

  cleanedProjectList.push(cleanedProject);
  
} 
res.status(200).json( {cleanedProjectList} );
}else {res.status(200).json({ message: "no project to show"})}

});

const getMyProjects = errorWrapper(async (req, res) => {
  const userInfofromToken = req.foundUser;

  const projectList = await ProjectService.findMyProjects(
    req.query,
    userInfofromToken.company_id
  );

  let cleanedProjectList = [];

  if (projectList.length>0) {for(let len=0; len<projectList.length;len++){
    const id = projectList[len].id? projectList[len].id:null;
    const name = projectList[len].name? projectList[len].name: null;
    const introduction = projectList[len].introduction? projectList[len].introduction:null;
    const host = projectList[len].host? projectList[len].host:null;
    const due_date = await dateForm(projectList[len].due_date);
    const eligible_sectors = projectList[len].eligible_sectors? projectList[len].eligible_sectors.name : null;
    const eligibilities = projectList[len].eligibilities? projectList[len].eligibilities.name:null;
    const outline = projectList.outline? requestedFields.outline:null;  
    const detail = projectList[len].detail? projectList[len].detail : null;
    const application_method = projectList[len].application_method? projectList[len].application_method : null;
    const caution = projectList[len].caution? projectList[len].caution : null;
    const contact = projectList[len].contact? projectList[len].contact : null;
    const application_url = projectList[len].application_url? projectList[len].application_url : null;
    const project_images = projectList[len].project_images.length>0? projectList[len].project_images[0].img_url: null;
    const reqDocExists = projectList[len].required_documents? projectList[len].required_documents: undefined;
    const required_documents = reqDocExists.length > 0 ? reqDocExists.map((el) => el.document_types.name) : reqDocExists;

  let cleanedProject = {};
  cleanedProject.id = id
  cleanedProject.name = name
  cleanedProject.introduction = introduction
  cleanedProject.host = host
  cleanedProject.due_date = due_date
  cleanedProject.eligible_sectors = eligible_sectors
  cleanedProject.eligibilities = eligibilities
  cleanedProject.outline = outline
  cleanedProject.detail = detail
  cleanedProject.application_method = application_method
  cleanedProject.caution = caution
  cleanedProject.contact = contact
  cleanedProject.application_url = application_url
  cleanedProject.project_images = project_images
  cleanedProject.required_documents = required_documents

  cleanedProjectList.push(cleanedProject);
  
}   res.status(200).json({ cleanedProjectList });
}else {res.status(200).json({ message: "no project to show"})}
});

const getOneProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const projectDetail = await ProjectService.findOneProject({ id: projectId });
  let cleanedProject = {};

  if (projectDetail) {
    const id = projectDetail.id? projectDetail.id:null;
    const name = projectDetail.name? projectDetail.name: null;
    const introduction = projectDetail.introduction? projectDetail.introduction:null;
    const host = projectDetail.host? projectDetail.host:null;
    const due_date = await dateForm(projectDetail.due_date);
    const eligible_sectors = projectDetail.eligible_sectors? projectDetail.eligible_sectors.name : null;
    const eligibilities = projectDetail.eligibilities? projectDetail.eligibilities.name:null;
    const outline = projectDetail.outline? projectDetail.outline:null;  
    const detail = projectDetail.detail? projectDetail.detail : null;
    const application_method = projectDetail.application_method? projectDetail.application_method : null;
    const caution = projectDetail.caution? projectDetail.caution : null;
    const contact = projectDetail.contact? projectDetail.contact : null;
    const application_url = projectDetail.application_url? projectDetail.application_url : null;
    const project_images = projectDetail.project_images.length>0? projectDetail.project_images[0].img_url: null;
    const reqDocExists = projectDetail.required_documents? projectDetail.required_documents: undefined;
    const required_documents = reqDocExists.length > 0 ? reqDocExists.map((el) => el.document_types.name) : reqDocExists;
    const tag = projectDetail.tag? projectDetail.tag: undefined;


    let hasApplied;
    const userInfofromToken = req.foundUser ? req.foundUser : undefined;
    if (userInfofromToken && userInfofromToken.company_id) {
      const isStartup = userInfofromToken.type_id === 1;
      const findApplied = isStartup
        ? await ApplyService.findMyApplication({
            company_id: userInfofromToken.company_id,
            project_id: Number(projectId),
          })
        : false;
      hasApplied = findApplied ? true : false;
    } else {
      hasApplied = false;
    }
  
    let hasLiked;
    if (userInfofromToken) {
      const isStartup = userInfofromToken.type_id === 1;
      const findLiked = isStartup? await LikeService.findIsLiked("project_likes",userInfofromToken.user_id, projectId ):false;
      hasLiked = findLiked? true : false;
    }else{
      hasLiked = false
    }

  cleanedProject.id = id
  cleanedProject.name = name
  cleanedProject.introduction = introduction
  cleanedProject.host = host
  cleanedProject.due_date = due_date
  cleanedProject.eligible_sectors = eligible_sectors
  cleanedProject.eligibilities = eligibilities
  cleanedProject.outline = outline
  cleanedProject.detail = detail
  cleanedProject.application_method = application_method
  cleanedProject.caution = caution
  cleanedProject.contact = contact
  cleanedProject.application_url = application_url
  cleanedProject.project_images = project_images
  cleanedProject.required_documents = required_documents
  cleanedProject.tag = tag
  cleanedProject.hasApplied = hasApplied
  cleanedProject.hasLiked = hasLiked

  res.status(200).json({ cleanedProject });

}else {res.status(200).json({ message: "no project to show"})}

});

const tempSaveProjectInfo = errorWrapper(async (req, res, next) => {
  const userInfofromToken = req.foundUser;
  const requestedFields = req.body;
  const projectDetail = req.params.projectId? await ProjectService.findOneProject({ id: req.params.projectId }): await ProjectService.createProject({userInfofromToken,});
  if (!projectDetail) errorGenerator({ statusCode: 404, message: "project not found" });
  const { company: companyIdfromProject } = projectDetail;
  if (userInfofromToken.company_id !== companyIdfromProject) errorGenerator({ statusCode: 403, message: "unauthorized" });

  const name = requestedFields.name? requestedFields.name: null;
  const introduction = requestedFields.introduction? requestedFields.introduction:null;
  const host = requestedFields.host? requestedFields.host:null;
  const due_date = await dateForm(requestedFields.due_date);
  const eligible_sectors = requestedFields.eligible_sectors? await CompanyService.getRelatedInfoId("eligible_sectors", requestedFields.eligible_sectors): undefined;
  const eligibilities = requestedFields.eligibilities? await CompanyService.getRelatedInfoId("eligibilities", requestedFields.eligibilities): undefined;
  const outline = requestedFields.outline? requestedFields.outline:null;
  const detail = requestedFields.detail? requestedFields.detail : null;
  const application_method = requestedFields.application_method? requestedFields.application_method : null;
  const caution = requestedFields.caution? requestedFields.caution : null;
  const contact = requestedFields.contact? requestedFields.contact : null;
  const application_url = requestedFields.application_url? requestedFields.application_url : null;
  const project_images = req.file? req.file.location: projectDetail.project_images? projectDetail.project_images.img_url: null;


  const projectAction = await ProjectService.updateProject({
    projectId: projectDetail.id,
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
  });

  await ProjectService.resetChoices({ projectDetail });
  const required_documents = requestedFields.required_documents? requestedFields.required_documents: null;
  if (required_documents) {
    for (len = 0; len < required_documents.length; len++) {
      let requiredDocId = await CompanyService.getRelatedInfoId("document_types", required_documents[len]);
      await ProjectService.createRelatedDoc(
        requiredDocId,
        projectAction,
      );
    }
  } else {
  }

  res.status(201).json({
    message: "project info saved",
    ProjectId: projectAction.id,
  });
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
    message: "project images successfully deleted",
  });
});

const requestOpenProject = errorWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userInfofromToken = req.foundUser;

  const foundProject = await ProjectService.findOneProject({ id: projectId });
  if (!foundProject)
    errorGenerator({ statusCode: 404, message: "project not found" });
  const { company: companyIdfromProject } = foundProject;

  if (userInfofromToken.company_id !== companyIdfromProject)
    errorGenerator({ statusCode: 403, message: "unauthorized" });

  await ProjectService.openRequest({ projectId });
  res.status(201).json({
    message: "request to open project successfully delivered ",
  });
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
  tempSaveProjectInfo,
  openOneProject,
  deleteProjectPic,
  deleteOneProject,
  requestOpenProject,
  likeProject,
};
