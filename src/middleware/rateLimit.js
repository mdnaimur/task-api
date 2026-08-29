/*
 * Title: rate limit
 * Description:
 * Author: Md Naimur Rahman
 * Date: 29/08/2026
 */

const { AppError } = require("../errors");

const requests = new Map();

const WINDOW_MS = 60 * 1000;

const MAX_REQUESTS = 10;

function rateLimit(req, res) {
  const ip = req.socket.remoteAddress || "unknown";
  const now = Date.now();

  let record = requests.get(ip);

  if (!record || now - record.start >= WINDOW_MS) {
    record = {
      start: now,
      count: 0,
    };
  }
  record.count++;

  requests.set(ip, record);
  if (record.count > MAX_REQUESTS) {
    throw new AppError(429, "Too many requests");
  }
}

setInterval(() => {
  const now = Date.now();

  for (const [ip, record] of requests) {
    if (now - record.start >= WINDOW_MS) {
      requests.delete(ip);
    }
  }
}, WINDOW_MS).unref();

module.exports = { rateLimit };
