/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

function info(message, data = {}) {
  console.log(`[INFO] ${message}`, data);
}

function error(message, data = {}) {
  console.error(`[ERROR] ${message}`, data);
}

module.exports = {
  info,
  error,
};
