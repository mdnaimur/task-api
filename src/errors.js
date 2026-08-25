/*
 * Title: error handler
 * Description: cusrom error handle implemantion
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = {
  AppError,
};
