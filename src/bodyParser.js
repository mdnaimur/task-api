/*
 * Title: body parser
 * Description: requested data covert as json
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
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
