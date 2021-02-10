const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const ProjectRouter = require("./ProjectRouter");
const CompanyRouter = require("./CompanyRouter");
const InitialRouter = require("./InitialRouter");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");
const LikeRouter = require('./LikeRouter')
const ApplyRouter = require("./ApplyRouter")
const DocRouter = require("./DocRouter")

router.use('/users', UserRouter)
router.use("/projects", ProjectRouter);
router.use("/initials", InitialRouter);
router.use("/companies", CompanyRouter);
router.use("/auths", AuthRouter);
router.use('/likes', LikeRouter);
router.use("/applies", ApplyRouter);
router.use("/doc", DocRouter);


module.exports = router;
