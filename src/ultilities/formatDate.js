const moment = require("moment");
const formatDate = (date) => {
  return moment(date).format("hh:mm DD/MM/YY")
}

module.exports = formatDate;