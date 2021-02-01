
const s3 = require('./s3')

const dayjs = require("dayjs")

const dateForm = async (dateInfo) => {
  return await dayjs(dateInfo).toDate()
}

const forloop = (target) => {
  for (x=0; x < target.length; x++) return { create : { document_types: { connect: { id: Number(target[x]) } } } }}



module.exports = {
  s3,
  dateForm,
  forloop
}
