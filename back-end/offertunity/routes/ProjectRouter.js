const express = require("express");
const router = express.Router();
const upload = require("../utils/s3");
const { ProjectController } = require("../controllers");
const { validateToken, save, checkLogIn } = require("../middlewares");

router.get("/published", ProjectController.getPublishedProjects);

router.get("/", checkLogIn, ProjectController.getMyProjects);

router.get("/:projectId", checkLogIn, ProjectController.getOneProject);

router.post("/newproject", validateToken, ProjectController.startNewProject);

router.post(
  "/allinfo/temp/:projectId",
  validateToken,
  upload.single("project_picture"),
  ProjectController.tempSaveProjectInfo
);

router.post(
  "/allinfo/save/:projectId",
  validateToken,
  save,
  upload.single("project_picture"),
  ProjectController.tempSaveProjectInfo,
  ProjectController.saveProjectInfo
);

router.put(
  "/publish/:projectId",
  validateToken,
  upload.single("project_picture"),
  ProjectController.openOneProject
);

router.delete(
  "/deletephoto/:projectId",
  validateToken,
  ProjectController.deleteProjectPic
);

router.delete("/:projectId", validateToken, ProjectController.deleteOneProject);

module.exports = router;
