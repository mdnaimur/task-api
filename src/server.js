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
const requestHandler = require("./requestHandler");
const { addRoute } = require("./router");
const registerRoutes = require("./routes");

registerRoutes(addRoute);

const server = http.createServer(requestHandler);
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});


