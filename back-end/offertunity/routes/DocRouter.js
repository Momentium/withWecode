const express = require("express");
const router = express.Router();
const upload = require("../utils/s3");
const { validateToken, save, checkLogIn } = require("../middlewares");
const { DocController } = require("../controllers")

router.post(
    "/upload",
    validateToken,
    upload.single("document"),
    DocController.uploadDocument
);

// docType: ir, plan, etc
router.get(
    "/list/type/:docType",
    validateToken,
    DocController.getDocuments
);

router.get(
    '/:docId',
    validateToken,
    DocController.getOneDocument
)

router.get(
    "/download/:companyId/:docTypeId",
    validateToken,
    DocController.getDocuments
);

router.delete(
    "/:docId",
    validateToken,
    DocController.deleteDocument
);

module.exports = router;
