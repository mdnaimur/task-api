/*
 * Title: error handler
 * Description: cusrom error handle implemantion
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  AppError,
};
