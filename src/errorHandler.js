/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const { AppError } = require("./errors");
const { sendJson } = require("./utils/http");

function errorHandler(error, res) {
  if (error instanceof AppError) {
    sendJson(res, error.statusCode, {
      error: error.message,
    });
    return;
  }

  console.error(error);

  sendJson(res, 500, {
    error: "Internal Server Error",
  });
}

module.exports = errorHandler;
