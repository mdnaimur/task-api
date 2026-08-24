/*
 * Title: body parser
 * Description: requested data covert as json
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

const { AppError } = require("./errors");

const MAX_BODY_SIZE = 1024 * 1024;

function parseJsonBody(req) {
  const contentType = req.headers["content-type"];

  if (!contentType || !contentType.startsWith("application/json")) {
    throw new AppError(415, "Content type must be application/json");
  }
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body, "utf8") > MAX_BODY_SIZE) {
        req.destroy();
        reject(new AppError(413, "Request body is too large"));
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

module.exports = parseJsonBody;
