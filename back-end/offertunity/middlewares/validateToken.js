const { errorWrapper, errorGenerator } = require("../errors");
const { UserService } = require("../services");
const { AUTH_TOKEN_SALT } = process.env;
const jwt = require("jsonwebtoken");

const validateToken = errorWrapper(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (req.headers.authorization.includes(" ")) {
    [bearer, token] = req.headers.authorization.split(" ");
  } else {
    token = req.headers.authorization;
  }
  const { id } = jwt.verify(token, AUTH_TOKEN_SALT);
  const foundUser = await UserService.findUser({ id });
  if (!foundUser)
    errorGenerator({ statusCode: 404, message: "user not found" });

  req.foundUser = foundUser;
  next();
});

module.exports = validateToken;
