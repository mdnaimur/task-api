/*
 * Title: Request Hanlder
 * Description: all node request handle mange this page
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

// code module import
const { URL } = require("node:url");
const { addRoute, findRoute, findPath } = require("./router");
const parseJsonBody = require("./bodyParser");

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

addRoute("GET", "/tasks/:id", (req, res, params) => {
  sendJson(res, 200, {
    message: "Task found",
    id: params.id,
  });
});

addRoute("GET", "/tasks", (req, res, { query }) => {
  const page = query.get("page");
  const status = query.get("status");
  console.log(`query rotue check page = ${page} and status = ${status}`);

  sendJson(res, 200, {
    page,
    status,
  });
});

addRoute("GET", "/tasks", (req, res) => {
  sendJson(res, 200, {
    message: "Get tasks",
  });
});

addRoute("POST", "/tasks", async (req, res) => {
  try {
    const body = await parseJsonBody(req);
    sendJson(res, 201, {
      message: "Task received",
      task: body,
    });
  } catch (error) {
    sendJson(res, 400, {
      error: `invalid json error: ${error}`,
    });
  }

  //   sendJson(res, 200, {
  //     message: "Create tasks ",
  //   });
});

addRoute("PUT", "/tasks/:id", (req, res, params) => {
  sendJson(res, 200, {
    message: "updated successfully",
  });
});

addRoute("PUT", "/tasks/:id", (req, res, params) => {
  sendJson(res, 200, {
    message: "Deleted successfully",
  });
});
// handle request

async function requestHandler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = findRoute(req.method, url.pathname);
  //   console.log(`${JSON.stringify(route.handler)}`);

  if (route) {
    route.handler(req, res, {
      params: route.params,
      query: url.searchParams,
    });

    return;
  }

  if (findPath(url.pathname)) {
    sendJson(res, 405, {
      error: "Method not allowd",
    });
    return;
  }

  sendJson(res, 404, {
    error: "NOT FOUND",
  });
}

module.exports = requestHandler;
