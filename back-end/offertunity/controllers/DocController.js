const { CompanyService, UserService, LikeService } = require("../services");

const { typeChecker, lengthChecker, dateForm } = require("../utils");
const { errorWrapper, errorGenerator } = require("../errors");


const uploadDocument = errorWrapper(async (req, res) => {
  const companyId = req.foundUser.company_id;
  const { docType } = req.body;
  console.log(docType)
  const docTypeId = await CompanyService.getRelatedInfoId("document_types", docType)
  if (!req.file) errorGenerator({ statusCode: 400, message: "No upload Data" });
  console.log(req.file)
  // 파일 URL
  const docURL = req.file.location;
  // 파일 유형 처리
  const type = req.file.originalname.split('.');
  const fileType = type[type.length-1];
  // 파일명 처리
  const name = req.file.originalname.split('.')
  const docName = name.slice(0, name.length-1).join('.');

  const documentInfo = await CompanyService.registerDoc({
    companyId,
    docTypeId,
    docURL,
    docName,
    fileType
  });

  res.status(201).json({
    message: "information successfully added",
    documentInfo,
  });
});

const downloadStartupDoc = errorWrapper(async (req, res) => {
  const { companyId, docTypeId } = req.params;
  const fileKey = req.query["fileKey"];
  const fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);

  res.download(file);
});

const getDocuments = errorWrapper(async (req, res) => {
  const { docType } = req.params;
  const companyId = req.foundUser.company_id;
  
  let where
  let docTypeId
  if (docType === 'ir' || 'plan') {
    if (docType === 'ir') {
      docTypeId = await CompanyService.getRelatedInfoId('document_types', 'IR 자료')
    } else if (docType === 'plan') {
      docTypeId = await CompanyService.getRelatedInfoId('document_types', '사업계획서')
    }
  };

  if (docType === 'etc') {
    docTypeId = []
    docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '기타서류'))
    docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '대표자 주민등록증(운전면허증)'))
    docTypeId.push(await CompanyService.getRelatedInfoId('document_types', '사업자등록 사본'))
  };

  const readStartupDoc = await CompanyService.readDocuments({
      companyId,
      docTypeId
  })

  documents = []
  for (let len=0; len<readStartupDoc.length; len++) {
    documents.push({});
    documents[len].id = readStartupDoc[len].id;
    documents[len].name = readStartupDoc[len].name;
    documents[len].fileType = readStartupDoc[len].file_type.toUpperCase();
    documents[len].updateDate = readStartupDoc[len].updated_at;
    
    // 미리보기 & 다운로드 구현 
    documents[len].download = readStartupDoc[len].doc_url
    documents[len].preview = readStartupDoc[len].doc_url
  }

  res.status(200).json({
    message: "documents successfully read",
    documents
  });
});

const getOneDocument = errorWrapper(async (req, res) => {
})

const deleteDocument = errorWrapper(async (req, res) => {
  const companyId = req.foundUser.company_id;
  const { docId } = req.params;
  const document = await CompanyService.readRelatedInfo('company_documents', Number(docId))
  if (!document) errorGenerator({statusCode: 400, message: "This Document is not exist"})
  if (!(companyId === document.company_id)) errorGenerator({statusCode: 400, message: "This Document is not belonged to this company"})
  const deleteStartupDoc = await CompanyService.deleteDoc(Number(docId));
  res.status(204).json({
    message: "document successfully deleted",
  });
});

module.exports = { 
  uploadDocument,
  downloadStartupDoc,
  getDocuments,
  getOneDocument,
  deleteDocument,
};
