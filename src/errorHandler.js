/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const { AppError } = require("./errors");

function errorHandler(error, res) {
  if (error instanceof AppError) {
    res.statusCode = error.statusCode;

    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: error.message,
      }),
    );
    return;
  }

  console.error(error);

  res.statusCode = 500;

  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      error: "Internal Server Error",
    }),
  );
}

module.exports = errorHandler;
