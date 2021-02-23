const express = require("express");
const router = express.Router();
const upload = require("../utils/s3");

const { ApplyController } = require("../controllers");
const { validateToken } = require("../middlewares");

router.get(
  "/list/:projectId", 
  validateToken, 
  ApplyController.getApplications);

router.get(
  "/detail/:applicationId",
  validateToken,
  ApplyController.getOneApplication
);

router.post(
    "/:projectId", 
    validateToken, 
    ApplyController.postApplication
);

router.get(
  '/:projectId',
  validateToken,
  ApplyController.getMyApplication
);

router.put(
  "/:applicationId", 
  validateToken, 
  ApplyController.updateApplication
);

router.delete(
  "/:applicationtId", 
  validateToken, 
  ApplyController.deleteApplication
);

module.exports = router;
