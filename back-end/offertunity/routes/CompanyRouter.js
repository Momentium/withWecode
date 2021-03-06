const express = require("express");
const router = express.Router();
const upload = require("../utils/s3");
const { validateToken, save, checkLogIn } = require("../middlewares");
const { CompanyController } = require("../controllers");

// startup info
router.get(
    '/IR_count/:companyId',
    CompanyController.startupIRCount
)

router.get("/info/startup", validateToken, CompanyController.getStartupInfo);

router.post(
  "/info/startup/basic/temp",
  validateToken,
  upload.fields([
    { name: "logoImg", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  CompanyController.tempSaveStartupBasicInfo
);

router.post(
  "/info/startup/temp",
  validateToken,
  upload.fields([
    { name: "logoImg", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "startupImages", maxCount: 5 },
    { name: "memberImages", maxCount: 100 },
  ]),
  CompanyController.tempSaveStartupInfo
);

router.post(
  "/info/startup/save",
  validateToken,
  save,
  upload.fields([
    { name: "logoImg", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "startupImages", maxCount: 5 },
    { name: "memberImages", maxCount: 100 },
  ]),
  CompanyController.tempSaveStartupInfo,
  CompanyController.saveStartupInfo
);

router.get(
    '/project_info/startup',
    validateToken,
    CompanyController.getStartupSubmitInfo
)


router.post(
    '/project_info/startup/save',
    validateToken,
    upload.fields([
        { name: 'logoImg', maxCount: 1 }
    ]),
    CompanyController.saveStartupSubmitInfo
)

// partner info
router.get("/info/partner", validateToken, CompanyController.getPartnerInfo);

router.post(
  "/info/partner/basic/temp",
  validateToken,
  upload.fields([{ name: "logoImg", maxCount: 1 }]),
  CompanyController.tempSavePartnerBasicInfo
);

router.post(
  "/info/partner/temp",
  validateToken,
  upload.fields([
    { name: "logoImg", maxCount: 1 },
    { name: "portfolioImages", maxCount: 5 },
    { name: "memberImages", maxCount: 100 },
  ]),
  CompanyController.tempSavePartnerInfo
);

router.post(
  "/info/partner/save",
  validateToken,
  save,
  upload.fields([
    { name: "logoImg", maxCount: 1 },
    { name: "portfolioImages", maxCount: 5 },
    { name: "memberImages", maxCount: 100 },
  ]),
  CompanyController.tempSavePartnerInfo,
  CompanyController.savePartnerInfo
);

// delete
router.delete(
  "/del/member/:memberId",
  validateToken,
  CompanyController.deleteMember
);

// IR_count

router.delete(
    '/del/image/:imageId',
    validateToken,
    CompanyController.deleteImage
)

router.delete("/del/news/:newsId", validateToken, CompanyController.deleteNews);

// startup 정보 조회
router.get("/list/startup", checkLogIn, CompanyController.getStartups);
router.get("/startup/:companyId", checkLogIn, CompanyController.getOnestartup);

// partner 정보 조회
router.get("/list/partner", checkLogIn, CompanyController.getPartners);
router.get("/partner/:companyId", checkLogIn, CompanyController.getOnePartner);

module.exports = router;
