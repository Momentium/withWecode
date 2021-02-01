
const s3 = require('./s3')
const makeQueryOption = require('./makeQueryOption')

const dayjs = require('dayjs')

const upsertConnection = (name, oldValue, newValue) => {
    const shouldModify = oldValue != newValue || !!oldValue !== !!newValue;
    return shouldModify ?
      {
        [name]: newValue ? newValue : { disconnect: true }
      } : false;
    };

const typeChecker = (...data) => {
  const record = []
  for (len=0; len<data.length-1; len++) {
    record.push(typeof data[len] === typeof data[len+1])
  }
  const isTrue = (bool) => {
    return bool
  }
  if (record.every(isTrue)) {
    return typeof data[0]
  }
}

const lengthChecker = (...data) => {
  const record = []
  for (len=0; len<data.length-1; len++) {
    record.push(data[len].length === data[len].length);
  }
  const isTrue = (bool) => {
    return bool
  };
  if (record.every(isTrue)) {
    return data[0].length
  }
}

const dateForm = async (dateInfo) => {
  return await dayjs(dateInfo).toDate()
}

const dayjs = require("dayjs")

const dateForm = async (dateInfo) => {
  return await dayjs(dateInfo).toDate()
}

const forloop = (target) => {
  for (x=0; x < target.length; x++) return { create : { document_types: { connect: { id: Number(target[x]) } } } }}



module.exports = {
<<<<<<< HEAD
  s3,
  dateForm,
  forloop
=======
    upsertConnection,
    typeChecker,
    lengthChecker,
    dateForm,
    makeQueryOption
>>>>>>> back-end
}
