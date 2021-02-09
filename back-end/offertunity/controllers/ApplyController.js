const { errorWrapper, errorGenerator } = require('../errors');
const { ApplyService, ProjectService, CompanyService } = require('../services')

const getApplications = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const userInfo = req.foundUser

  const foundProject = await ProjectService.findOneProject({id: projectId })
  if (!foundProject) errorGenerator({ statusCode: 404, message: 'application not found'})

  if ((userInfo.company_id === foundProject.company_id) || (userInfo.type_id == 3)){
    const applicationList = await ApplyService.findApplications(req.query, projectId)

    const applicants = []
    if (!(applicationList.length === 0)) {
      for (let len=0; len < applicationList.length; len++) {
        applicants.push({})
        applicants[len].id = applicationList[len].id;
        applicants[len].logoImg = applicationList[len].companies.logo_img;
        applicants[len].name = applicationList[len].companies.name;
        applicants[len].sector = applicationList[len].companies.startups.sector_id ? await CompanyService.findInfoName("sectors", applicationList[len].companies.startups[0].sector_id) : null;
        applicants[len].technology = applicationList[len].companies.startups.core_technology_id ? await CompanyService.findInfoName("sectors", applicationList[len].companies.startups[0].core_technology_id) : null;
        applicants[len].appliedDate = applicationList[len].created_at;
      }
    }
    res.status(200).json({ applicants })
  } else errorGenerator({ statusCode: 403, message: 'unauthorized' })
})

const getOneApplication = errorWrapper(async (req, res) => {
  const { applicationId } = req.params
  const userInfo = req.foundUser

  const application = await ApplyService.findOneApplication({id: applicationId})
  
  console.log(application)
  const foundProject = await ProjectService.findOneProject({id: application.project_id })

  if (!(foundProject.company_id === userInfo.company_id)) errorGenerator({ statusCode: 404, message: 'Unauthorized'})

  const applicant = {}

  // applicant.logoImg = 



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
  
  // Partner 회원사 예외 처리
  const company = CompanyService.readCompany(userInfo.company_id);
  if (company.type_id === 2) errorGenerator({ statusCode: 400, message: "Partner Company Can not apply" });

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