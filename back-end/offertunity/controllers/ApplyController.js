const { errorWrapper, errorGenerator } = require('../errors');
const { ApplyService, ProjectService } = require('../services')

const getApplications = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const userInfo = req.foundUser

  const foundProject = await ProjectService.findOneProject({id: projectId })
  if (!foundProject) errorGenerator({ statusCode: 404, message: 'application not found'})
  const { company_id: companyIdfromProject } = foundProject

  if ((userInfo.company_id == companyIdfromProject) || (userInfo.type_id == 3)){
    const applicationList = await ApplyService.findApplications(req.query, projectId)
    res.status(201).json({ message: 'information successfully updated'})
  } else errorGenerator({ statusCode: 403, message: 'unauthorized' })

  res.status(200).json({ applicationList })
})

const getOneApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const ApplicationDetail = await ApplyService.findOneApplication({id: applicationId})
  res.status(200).json({ ApplicationDetail })
})

const getMyApplication = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  if (!(req.foundUser.company_id === 1)) errorGenerator({ statusCode: 400, message: "this user is not startup user" });
  const companyId = req.foundUser.company_id
  const ApplicationDetail = await ApplyService.findMyApplication({
    company_id: companyId,
    project_id: projectId
  })
  res.status(200).json({ ApplicationDetail })
})

const postApplication = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const userInfo = req.foundUser
  const { businessBrief, businessModel } = req.body

  // 미오픈 프로젝트 예외 처리
  const proejct = ProjectService.findOneProject({id: projectId})
  if (proejct.is_opened === 0) errorGenerator({ statusCode: 400, message: "this project is not opend" });

  const data = {
    companies: {connect: {id: Number(userInfo.company_id)}},
    projects: {connect: {id: Number(projectId)}},
    business_brief: businessBrief,
    business_model: businessModel
  }

  const createApplication = await ApplyService.createApplication(data, req.files)
  res.status(201).json({ message: 'information successfully added'})
})

const updateApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const userInfo = req.foundUser
  const { businessBrief, businessModel } = req.body

  const data = {
    business_brief: businessBrief,
    business_model: businessModel
  }

  const foundApplication = await ApplyService.findOneApplication({ id: applicationId })
  if (!foundApplication) errorGenerator({ statusCode: 404, message: 'application not found'})
  const { company_id: companyIdfromApplication } = foundApplication

  if ((userInfo.company_id == companyIdfromApplication) || (userInfo.type_id == 3)){
      await ApplyService.updateApplication(data, companyIdfromApplication)
      res.status(201).json({ message: 'information successfully updated'})
  } else errorGenerator({ statusCode: 403, message: 'unauthorized' })
})

const deleteApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const userInfofromToken = req.foundUser

  const foundApplication = await ApplyService.findOneApplication({ id: applicationId })
  if (!foundProject) errorGenerator({ statusCode: 404, message: 'application not found'})
  const { host: companyIdfromApplication } = foundApplication

  if ((userInfofromToken.company_id == companyIdfromApplication) || (userInfofromToken.type_id == 3)){
      await ApplyService.deleteApplication(applicationId)
      res.status(201).json({ message: 'information successfully deleted'})
  } else errorGenerator({ statusCode: 403, message: 'unauthorized' })
})

module.exports = {
  getApplications,
  getOneApplication,
  getMyApplication,
  postApplication,
  updateApplication,
  deleteApplication
}