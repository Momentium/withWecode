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
  
  const foundProject = await ProjectService.findOneProject({id: application.project_id })

  if (!(foundProject.company_id === userInfo.company_id)) errorGenerator({ statusCode: 404, message: 'Unauthorized'})

  const applicant = {}

  const data = {}
  if (application) {
      data.is_applied = true
      data.id = application.id;
      data.businessBrief = application.business_brief;
      data.businessModel = application.business_model;
      if (application.applicant_documents) {
        data.documents = []
        for (let len=0; len<application.applicant_documents.length; len++) {
          data.documents.push({})
          data.documents[len].id = application.applicant_documents[len].document_id;
          data.documents[len].name = application.applicant_documents[len].company_documents.name;
          data.documents[len].docType = application.applicant_documents[len].company_documents.file_type ? await CompanyService.findInfoName('document_types', application.applicant_documents[len].company_documents.type_id) : null;
          data.documents[len].docURL = application.applicant_documents[len].company_documents.doc_url;
        }
      }
  } else if (!application) {
      data.is_applied = false
  }

  res.status(200).json({ data })
})

const getDocuments = errorWrapper(async(req, res) => {
  const companyId = req.foundUser.company_id;
  ApplyService.findDocuments(req.query, companyId)
})

const getMyApplication = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  if (req.foundUser.type_id === 2) errorGenerator({ statusCode: 400, message: "this user is not startup user" });
  const companyId = req.foundUser.company_id

  const ApplicationDetail = await ApplyService.findMyApplication({
    company_id: companyId,
    project_id: Number(projectId)
  })

  const data = {}
  if (ApplicationDetail) {
      data.is_applied = true
      data.id = ApplicationDetail.id;
      data.businessBrief = ApplicationDetail.business_brief;
      data.businessModel = ApplicationDetail.business_model;
      if (ApplicationDetail.applicant_documents) {
        data.documents = []
        for (let len=0; len<ApplicationDetail.applicant_documents.length; len++) {
          data.documents.push({})
          data.documents[len].id = ApplicationDetail.applicant_documents[len].document_id;
          data.documents[len].name = ApplicationDetail.applicant_documents[len].company_documents.name;
          data.documents[len].docType = ApplicationDetail.applicant_documents[len].company_documents.file_type ? await CompanyService.findInfoName('document_types', ApplicationDetail.applicant_documents[len].company_documents.type_id) : null
        }
      }
  } else if (!ApplicationDetail) {
      data.is_applied = false
  }
  res.status(200).json({ data })
})

const postApplication = errorWrapper(async (req, res) => {
  const { projectId } = req.params
  const userInfo = req.foundUser
  const { businessBrief, businessModel, plan, etc } = req.body

  // 미오픈 프로젝트 예외 처리
  const proejct = await ProjectService.findOneProject({id: Number(projectId)})
  if (proejct.is_opened === 0) errorGenerator({ statusCode: 400, message: "this project is not opend" });
  
  // Partner 회원사 예외 처리
  const company = await CompanyService.readCompany(Number(userInfo.company_id));
  if (company.type_id === 2) errorGenerator({ statusCode: 400, message: "Partner Company Can not apply" });

  // 기신청 Startup 예외 처리
  const existApplication = await ApplyService.findMyApplication({
    company_id: userInfo.company_id,
    project_id: proejct.id
  })
  if (existApplication) errorGenerator({ statusCode: 400, message: "this company already submit application" });

  // 신청 회사 파일 여부 확인
  if (plan) {
    const planData = await CompanyService.readRelatedInfo('company_documents', Number(plan));
    docTypeId = await CompanyService.getRelatedInfoId('document_types', '사업계획서')
    if (!(planData.type_id === docTypeId)) errorGenerator({ statusCode: 400, message: "This Document is not Businedd Plac document" })
    if (!(planData.company_id === userInfo.company_id)) errorGenerator({ statusCode: 400, message: "This Document is not belonged to company" })
  }
  if (etc) {
    for (let len=0; len< etc.length; len++) {
      const etcData = await CompanyService.readRelatedInfo('company_documents', etc[len]);
      docTypeId = []
      docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '기타서류'))
      docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '대표자 주민등록증(운전면허증)'))
      docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '사업자등록 사본'))
      docTypeId.push(await CompanyService.getRelatedInfoId('document_types', 'IR 자료'))
      if (!(docTypeId.includes(etcData.type_id))) errorGenerator({ statusCode: 400, message: "This Document is not Businedd Plac document" })
      if (!(etcData.company_id === userInfo.company_id)) errorGenerator({ statusCode: 400, message: "This Document is not belonged to company" })
    }
  }

  const data = {
    companies: {connect: {id: Number(userInfo.company_id)}},
    projects: {connect: {id: Number(projectId)}},
    business_brief: businessBrief,
    business_model: businessModel
  }
  const createApplication = await ApplyService.createApplication(data, req.files)

  // plan etc 파일 연결 - applicant_documents에다가
  if (plan) {
    console.log(plan)
    await ApplyService.createApplicationDocument({
      applicants: {connect: {id: createApplication.id}},
      company_documents: {connect: {id: Number(plan)}}
    })
  }
  if (etc) {
      console.log(etc)
      for (let len=0; len< etc.length; len++) {
        await ApplyService.createApplicationDocument({
          applicants: {connect: {id: createApplication.id}},
          company_documents: {connect: {id: Number(etc[len])}}
      })
    }
  }
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
  deleteApplication,
  getDocuments
}