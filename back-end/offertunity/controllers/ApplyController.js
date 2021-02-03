const { errorWrapper, errorGenerator } = require('../errors');
const { ApplyService } = require('../services')

const getApplications = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const applicationList = await ApplyService.findApplications(req.query, { projectId})
  res.status(200).json({ applicationList })
})

const getOneApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const ApplicationDetail = await ApplyService.findOneApplication({id: applicationId})
  res.status(200).json({ ApplicationDetail })
})

const postApplication = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const userInfofromToken = req.foundUser
  const requestedFields = req.body

  const createApplication = await ApplyService.createApplication({projectId, userInfofromToken, requestedFields})
  res.status(201).json({ message: 'information successfully added'})
})

const updateApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const userInfofromToken = req.foundUser
  const requestedFields = req.body

  const foundApplication = await ApplyService.findOneApplication({ id: applicationId })
  if (!foundApplication) errorGenerator({ statusCode: 404, message: 'application not found'})
  const { company_id: companyIdfromApplication } = foundApplication
  console.log("user: ", userInfofromToken.company_id)
  console.log("applicant: ", companyIdfromApplication)

  if ((userInfofromToken.company_id == companyIdfromApplication) || (userInfofromToken.type_id == 3)){
      await ApplyService.updateApplication({applicationId, requestedFields, userInfofromToken})
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
  postApplication,
  updateApplication,
  deleteApplication
}