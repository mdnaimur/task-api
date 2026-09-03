/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 02/09/2026
 */

import express from "express";
import crypto from "crypto";
import taskRoute from "./routes/task.routes.js";
import logger from "./middleware/logger.middleware.js";

import pool from "./db/pool.js";

const app = express();
app.use(express.json());
app.use(logger);

const result = await pool.query("SELECT NOW()");
console.log(result.rows);

const result3 = await pool.query(
  "SELECT * FROM tasks ORDER BY id"
);

console.log(result3.rows);
// app.use((err, req, res, next) => {
//   console.error(err);

//   res.status(500).json({
//     error: err.message,
//   });
// });

// app.use((req, res, next) => {
//   console.log("Middleware 1");

//   console.log("Before");

//   next();

//   console.log("After");
//   //   next();
// });

// app.use((req, res, next) => {
//   console.log("Middleware 2");
//   next();
// });

const requestId = (req, res, next) => {
  req.requestId = crypto.randomUUID();

  console.log(req.requestId);
  next();
};

// app.use(logger);
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//   });
// });

// app.use("/tasks", taskRoute);
app.get("/tasks", requestId, (req, res) => {
  console.log("[APP ROUTE] /tasks");
  res.json([]);
});

app.get("/health", (req, res) => {
  console.log("[APP ROUTE] /health");
  res.json({ status: "Ok" });
});

// const errorHandler = (err, req, res, next) => {
//   console.error(err);

//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(500).json({
//     error: {
//       code: "INTERNAL_SERVER_ERROR",
//       message: "Something went wrong",
//     },
//   });
// };

const errorHandler = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode,
    code: err.code,
  });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
};

app.use("/task-api", taskRoute);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("task api running on port 3000");
});
