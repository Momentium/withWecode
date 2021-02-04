const s3 = require("./s3");
const makeQueryOption = require("./makeQueryOption");

const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

const upsertConnection = (name, oldValue, newValue) => {
    const shouldModify = oldValue != newValue || !!oldValue !== !!newValue;
    return shouldModify ? {
            [name]: newValue ? newValue : { disconnect: true },
        } :
        false;
};

const typeChecker = (...data) => {
    const record = [];
    for (len = 0; len < data.length - 1; len++) {
        record.push(typeof data[len] === typeof data[len + 1]);
    }
    const isTrue = (bool) => {
        return bool;
    };
    if (record.every(isTrue)) {
        return typeof data[0];
    }
};

const lengthChecker = (...data) => {
    const record = [];
    for (len = 0; len < data.length - 1; len++) {
        record.push(data[len].length === data[len].length);
    }
    const isTrue = (bool) => {
        return bool;
    };
    if (record.every(isTrue)) {
        return data[0].length;
    }
};

<<<<<<< HEAD
const dateForm = async (dateInfo) => {
  return new Date(dateInfo)
=======
const dateForm = async(dateInfo) => {
    return new Date(dateInfo)
>>>>>>> 57bd9832626c7a4d551d43fe5bd3301419f388aa
};

module.exports = {
    s3,
    dateForm,
    upsertConnection,
    typeChecker,
    lengthChecker,
    makeQueryOption,
};