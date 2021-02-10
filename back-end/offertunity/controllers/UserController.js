require("dotenv").config();
const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");
const passport = require("passport");

const signUp = errorWrapper(async (req, res) => {
  const { email, name, password, typeId, signUpMethodId, terms } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const foundUser = await UserService.findUser({ email });
  if (foundUser) {
    errorGenerator({ statusCode: 409, message: "duplicated" });
    res.status(409).json({
      message: "duplicated",
    });
  }

  const createdUser = await UserService.createUser({
    email,
    name,
    password: hashedPassword,
    user_types: { connect: { id: Number(typeId) } },
    signup_methods: { connect: { id: Number(signUpMethodId) } },
    terms,
  });

  res.status(201).json({
    message: "user created",
    email: createdUser.email,
  });
});

const signIn = errorWrapper(async (req, res) => {
  const { email, password: inputPassword } = req.body;
  const foundUser = await UserService.findUser({ email });
  if (!foundUser)
    errorGenerator({ statusCode: 400, message: "client input invalid" });
  const { id, password: hashedPassword } = foundUser;
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword)
    errorGenerator({ statusCode: 400, message: "client input invalid" });
  const token = jwt.sign({ id }, AUTH_TOKEN_SALT);
  res.status(200).json({
    message: "login success!",
    token,
    id: foundUser.id,
    email: foundUser.email,
    type_id: foundUser.type_id,
    name: foundUser.name,
    profile_picture: foundUser.profile_picture,
    company_id: foundUser.company_id,
  });
});

const showMemberInfo = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  const userInfo = await UserService.findUserInfo({ id: userId });
  
  res.status(200).json({ userInfo });
});

const addMemberInfo = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  console.log("file: ", req.file)
  let requestedFields = req.body;

  const userInfo = await UserService.findUserInfo({ id: userId });
  const profile_picture = req.file
    ? req.file.location
    : userInfo.profile_picture
    ? userInfo.profile_picture
    : null;

  requestedFields.profile_picture = profile_picture
  console.log(requestedFields)
  const addInfo = await UserService.updateInfo({
    userId,
    requestedFields,
  });
  res.status(201).json({
    message: "information successfully added",
  });
});

const resetPassword = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  const { password: inputPassword, newpassword: newpassword } = req.body;

  const foundUser = await UserService.findUser({ id:userId });
  if (!foundUser)
    errorGenerator({ statusCode: 400, message: "client input invalid" });
  const { password: hashedPassword } = foundUser;
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword)
    errorGenerator({ statusCode: 400, message: "client input invalid" });
  const newPassword = await bcrypt.hash(newpassword, 10);
  let requestedFields = {};
  requestedFields.password = newPassword
  await UserService.updateInfo({
    userId,
    requestedFields  });
  res.status(201).json({
    message: "password reset successful",
  });


})

const deleteProfilePic = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  await UserService.deleteImage({ id: userId });
  res.status(201).json({
    message: "user profile picture successfully deleted",
  });
});

const deleteMember = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser;
  const { password: inputPassword } = req.body;

  const foundUser = await UserService.findUser({ id:userId });
  if (!foundUser)
    errorGenerator({ statusCode: 400, message: "client input invalid" });
  const { password: hashedPassword } = foundUser;
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword)
    errorGenerator({ statusCode: 400, message: "client input invalid" });

  const deleteMemberInfo = await UserService.deleteMember({ id: userId });
  res.status(201).json({
    message: "user successfully deleted",
  });
});

module.exports = {
  signIn,
  signUp,
  showMemberInfo,
  addMemberInfo,
  resetPassword,
  deleteProfilePic,
  deleteMember,
};
