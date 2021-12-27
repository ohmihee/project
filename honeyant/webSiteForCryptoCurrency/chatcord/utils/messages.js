const moment = require('moment');
//날짜 관련 유용한 리이브러리
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
    // 해당 format으로 맞춰줌
  };
}

module.exports = formatMessage;
