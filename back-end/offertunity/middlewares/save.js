const { errorWrapper, errorGenerator } = require("../errors");

const save = errorWrapper(async (req, res, next) => {
  req.save = true;
  next();
});

module.exports = save;
