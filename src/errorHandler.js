/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const { AppError } = require("./errors");
const { sendJson } = require("./utils/http");
const logger  = require("./utils/logger");

function errorHandler(error, res) {
  if (error instanceof AppError) {
    //    if (error.isOperational)
    sendJson(res, error.statusCode, {
      error: error.message,
    });
    return;
  }

  // console.error(error);
  logger.error("Unexpected error", {
    name: error.name,
    message: error.message,
    stack: error.stack,
  });

  sendJson(res, 500, {
    error: "Internal Server Error",
  });
}

module.exports = errorHandler;
