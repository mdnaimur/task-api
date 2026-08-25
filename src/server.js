/*
 * Title: TASK manage
 * Description: TASK mangement only nodejs
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */
// core module

const config = require("./config");
const http = require("node:http");

// custom import

const app = require("./app");

let shuttingDown = false;

const server = http.createServer((req, res) => {
  if (shuttingDown) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        error: "Server is shutting down",
      }),
    );

    return;
  }
  app(req, res);
});
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

/**
 * Graceful Shutdown
 */
function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  shuttingDown = true;

  server.close(() => {
    console.log("HTTP server closed.");

    process.exit(0);
  });
}

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
