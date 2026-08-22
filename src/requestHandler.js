/*
 * Title: Request Hanlder
 * Description: all node request handle mange this page
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

// code module import
const { URL } = require("node:url");
const { addRoute, findRoute } = require("./router");

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

addRoute("GET", "/health", (req, res) => {
  sendJson(res, 200, {
    status: "ok",
    service: "Task Management API",
  });
});

addRoute("GET", "/about", (req, res) => {
  sendJson(res, 200, {
    name: "Task Management API",
    version: "1.0.0",
  });
});

function requestHandler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = findRoute(req.method, url.pathname);
  console.log(`${JSON.stringify(route.handler)}`);

  if (!route) {
    sendJson(res, 404, {
      error: "NOT FOUND",
    });
    return;
  }

  route.handler(req, res);
}

module.exports = requestHandler;
