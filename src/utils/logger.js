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

function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();

  console.log(`[${level}] ${timestamp} ${message}`, data);
}

function debug(message, data = {}) {
  log("DEBUG", message, data);
}

function info(message, data = {}) {
  log("INFO", message, data);
}

function warn(message, data = {}) {
  log("WARN", message, data);
}

// function error(message, data = {}) {
//     log("ERROR", message, data);
// }

function logRequest({ method, url, statusCode, duration }) {
  console.log(
    `[${new Date().toISOString()}] ` +
      `${method} ${url} ` +
      `${statusCode} ${duration}ms`,
  );
}

module.exports = {
  info,
  error,
  debug,
  log,
  warn,
  logRequest,
};
