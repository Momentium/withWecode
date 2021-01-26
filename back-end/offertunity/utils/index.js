const s3 = require('./s3')

const upsertConnection = (name, oldValue, newValue) => {
    const shouldModify = oldValue != newValue || !!oldValue !== !!newValue;
    return shouldModify ?
      {
        [name]: newValue ? newValue : { disconnect: true }
      } : false;
    };

module.exports = {
    upsertConnection
}