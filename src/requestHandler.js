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

function requestHandler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const page = url.searchParams.get("page");
  console.log("page", page);
  console.log(`Path name: ${url.pathname}`);
  //   console.log(`Headers details: ${req.headers}`);
  //   console.log("Headers:", JSON.stringify(req.headers, null, 2));
  //   console.log(`query: ${url.searchParams.toString()}`);
  //   console.log("Method", req.method);
  console.log("URL", req.url);
  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, {
      status: "ok",
      service: "Task Management API",
    });

    return;
  }

  if (req.method === "GET" && req.url === "/about") {
    sendJson(res, 200, {
      name: "Task manage API: about page",
      version: "1.0.0",
    });
    return;
  }

  sendJson(res, 400, {
    error: "not found",
  });
}

module.exports = requestHandler;
