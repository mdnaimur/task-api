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
const { readTasks, writeTasks } = require("./repositories/taskRepository");
const errorHandler = require("./errorHandler");
const { sendJson } = require("./utils/http");
const logger = require("./utils/logger");

async function requestHandler(req, res) {
  //FIX: for count time
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP request", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  /// main handler start
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const route = findRoute(req.method, url.pathname);
    if (route) {
      // for (const handler of route.handlers) {
      //   await route.handler(req, res, {
      //     params: route.params,
      //     query: url.searchParams,
      //   });
      // }
      // return;

      const context = {
        params: route.params,
        query: url.searchParams,
      };

      for (const handler of route.handlers) {
        await handler(req, res, context);
      }

      return;
    }

    if (findPath(url.pathname)) {
      sendJson(res, 405, {
        error: "Method NOt allowd",
      });
      return;
    }

    sendJson(res, 404, {
      error: "Not found",
    });
  } catch (error) {
    errorHandler(error, res);
  }
}
module.exports = requestHandler;

// const {
//   createTask,
//   deleteTask,
//   getTaskById,
//   getTasks,
//   updateTask,
// } = require("./services/taskService");

// const { AppError } = require("./errors");

// const errorHandler = require("./errorHandler");

// function sendJson(res, statusCode, data) {
//   res.statusCode = statusCode;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify(data));
// }

// addRoute("GET", "/health", (req, res) => {
//   sendJson(res, 200, {
//     status: "ok",
//     service: "Task Management API",
//   });
// });

// addRoute("GET", "/about", (req, res) => {
//   sendJson(res, 200, {
//     name: "Task Management API",
//     version: "1.0.0",
//   });
// });

// addRoute("GET", "/tasks/:id", async (req, res, { params }) => {
//   const task = await getTaskById(params.id);
//   if (!task) {
//     throw new AppError(404, "Task not found");
//   }
//   sendJson(res, 200, task);
// });

// addRoute("GET", "/tasks", async (req, res) => {
//   const tasks = await getTasks();

//   sendJson(res, 200, tasks);
// });

// addRoute("POST", "/tasks", async (req, res) => {
//   try {
//     const body = await parseJsonBody(req);
//     console.log("[body] Inside request hanlder post - task", body);
//     const errors = validateTask(body);
//     console.log("[errors ]Inside request hanlder post - task", body);

//     if (Object.keys(errors).length > 0) {
//       sendJson(res, 400, {
//         error: "Validation failed \n",
//         details: errors,
//       });
//       return;
//     }

//     const tasks = await readTasks();

//     const task = {
//       id: Date.now().toString(),
//       title: body.title.trim(),
//       completed: body.completed ?? false,
//     };
//     tasks.push(task);

//     await writeTasks(tasks);
//     return sendJson(res, 201, task);
//   } catch (error) {
//     return sendJson(res, 500, {
//       error: `Internet server error: ${error}`,
//     });
//   }

//   //   sendJson(res, 200, {
//   //     message: "Create tasks ",
//   //   });
// });

// addRoute("PUT", "/tasks/:id", (req, res, { params }) => {
//   sendJson(res, 200, {
//     message: "updated successfully",
//   });
// });

// addRoute("PATCH", "/tasks/:id", async (req, res, { params }) => {
//   const body = await parseJsonBody(req);
//   const errors = validateTaskUpdate(body);

//   if (Object.keys(errors).length > 0) {
//     sendJson(res, 400, {
//       error: "validation failed",
//       details: errors,
//     });
//     return;
//   }
//   const task = await updateTask(params.id, body);
//   if (!task) {
//     throw new AppError(404, "Task not found");
//   }
//   sendJson(res, 200, task);
// });

// addRoute("DELETE", "/tasks/:id", async (req, res, { params }) => {
//   const taskDelete = await deleteTask(params.id);

//   if (!taskDelete) {
//     throw new AppError(404, "Task not found");
//   }
//   res.statusCode = 204;
//   res.end();
// });
// // handle request

// async function requestHandler(req, res) {
//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const route = findRoute(req.method, url.pathname);
//     //   console.log(`${JSON.stringify(route.handler)}`);

//     if (route) {
//       await route.handler(req, res, {
//         params: route.params,
//         query: url.searchParams,
//       });

//       return;
//     }

//     if (findPath(url.pathname)) {
//       sendJson(res, 405, {
//         error: "Method not allowd",
//       });
//       return;
//     }

//     sendJson(res, 404, {
//       error: "NOT FOUND",
//     });
//   } catch (error) {
//     errorHandler(error, res);
//   }
// }
// module.exports = requestHandler;
