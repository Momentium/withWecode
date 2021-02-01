const express = require("express");
const router = express.Router();

const UserRouter = require("./UserRouter");

const passport = require("passport");
const bcrypt = require("bcrypt");
const ProjectRouter = require("./ProjectRouter");
const InitialRouter = require("./InitialRouter");

router.use("/users", UserRouter);
router.use("/projects", ProjectRouter);
router.use("/initials", InitialRouter);

const CompanyRouter = require("./CompanyRouter");
const AuthRouter = require("./AuthRouter");
// const LikeRouter = require('./LikeRouter')

router.use("/companies", CompanyRouter);
router.use("/initials", InitialRouter);
router.use("/auths", AuthRouter);
// router.use('/like', LikeRouter)

module.exports = router;
