const express = require("express");
const router = express.Router();
const { InitialController } = require("../controllers");

router.post("/data", InitialController.InitialDataSetting);

module.exports = router;
