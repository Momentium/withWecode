const { errorWrapper, errorGenerator } = require('../errors')

const save = errorWrapper(async(req, res, next) => {
    req.companySave = true
    next()
})

module.exports = save