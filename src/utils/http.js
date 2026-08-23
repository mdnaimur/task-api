/*
 * Title: utils
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(data));
}

module.exports = {
  sendJson,
};
