const express = require("express");
const router = express.Router();
const upload = require("../utils/s3");

const { ApplyController } = require("../controllers");
const { validateToken } = require("../middlewares");

router.get("/:projectId", validateToken, ApplyController.getApplications);
router.get(
  "/detail/:applicationId",
  validateToken,
  ApplyController.getOneApplication
);
router.post(
  "/:projectId",
  validateToken,
  upload.fields([
    { name: "businessPlan", maxCount: 1 },
    { name: "businessCertification", maxCount: 1 },
    { name: "repID", maxCount: 1 },
    { name: "IRdocuments", maxCount: 1 },
    { name: "etc", maxCount: 1 },
  ]),
  ApplyController.postApplication
);
router.put("/:applicationId", validateToken, ApplyController.updateApplication);
router.delete(
  "/:applicationtId",
  validateToken,
  ApplyController.deleteApplication
);

module.exports = router;
