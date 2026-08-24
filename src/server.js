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

const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
