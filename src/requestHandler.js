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

const { validateTask, validateTaskUpdate } = require("./validators");
const { readTasks, writeTasks } = require("./taskRepository");

const { AppError } = require("./errors");

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

addRoute("GET", "/tasks/:id", async (req, res, { params }) => {
  try {
    const tasks = await readTasks();
    // console.log(tasks);
    // console.log(Array.isArray(tasks));
    console.log(params);
    console.log(params.id);
    const task = tasks.find((task) => task.id === params.id);

    if (!task) {
      sendJson(res, 404, {
        error: "task not found",
      });
      return;
    }

    sendJson(res, 200, task);
  } catch (error) {
    sendJson(res, 500, {
      error: `Internal Server Error: ${error}`,
      details: error.message,
      stack: error.stack,
    });
  }
});

// addRoute("GET", "/tasks", (req, res, { query }) => {
//   const page = query.get("page");
//   const status = query.get("status");
//   console.log(`query rotue check page = ${page} and status = ${status}`);

//   sendJson(res, 200, {
//     page,
//     status,
//   });
// });

addRoute("GET", "/tasks", async (req, res) => {
  try {
    const tasks = await readTasks();

    sendJson(res, 200, tasks);
  } catch (error) {
    sendJson(res, 500, {
      error: `Internal Server Error\n details: ${error}`,
    });
  }
});

addRoute("POST", "/tasks", async (req, res) => {
  try {
    const body = await parseJsonBody(req);
    console.log("[body] Inside request hanlder post - task", body);
    const errors = validateTask(body);
    console.log("[errors ]Inside request hanlder post - task", body);

    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, {
        error: "Validation failed \n",
        details: errors,
      });
      return;
    }

    const tasks = await readTasks();

    const task = {
      id: Date.now().toString(),
      title: body.title.trim(),
      completed: body.completed ?? false,
    };
    tasks.push(task);

    await writeTasks(tasks);
    return sendJson(res, 201, task);
  } catch (error) {
    return sendJson(res, 500, {
      error: `Internet server error: ${error}`,
    });
  }

  //   sendJson(res, 200, {
  //     message: "Create tasks ",
  //   });
});

addRoute("PUT", "/tasks/:id", (req, res, { params }) => {
  sendJson(res, 200, {
    message: "updated successfully",
  });
});

addRoute("PATCH", "/tasks/:id", async (req, res, { params }) => {
  try {
    const body = await parseJsonBody(req);
    console.log(`[body] inside patch: ${body}`);
    const errors = validateTaskUpdate(body);
    console.log(`[err] inside patch: ${errors}`);

    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, {
        error: "validation failed",
        details: errors,
      });
      return;
    }

    const tasks = await readTasks();

    const task = tasks.find((task) => task.id === params.id);

    if (!task) {
      sendJson(res, 404, {
        error: "Task not found",
      });
      return;
    }

    if (body.title !== undefined) {
      task.title = body.title.trim();
    }
    if (body.completed !== undefined) {
      task.completed = body.completed;
    }

    await writeTasks(tasks);

    sendJson(res, 200, task);
  } catch (error) {
    return sendJson(res, 500, {
      error: `Internet server error: ${error}`,
      details: error.message,
      stack: error.stack,
    });
  }
});

addRoute("DELETE", "/tasks/:id", async (req, res, { params }) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === params.id);

    if (taskIndex === -1) {
      (task) => task.id === params.id;
      sendJson(res, 404, {
        error: "task not found",
      });
      return;
    }

    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    res.statusCode = 204;
    res.end("Deleted successfully");
  } catch (error) {
    return sendJson(res, 500, {
      error: `Internet server error: ${error}`,
      details: error.message,
      stack: error.stack,
    });
  }
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
