/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 02/09/2026
 */

import express from "express";

import pool from "../db/pool.js";

const router = express.Router();

// console.log("I am task router: ", router);

const taskLogger = (req, res, next) => {
  console.log(`[TASK MIDDLEWARE] ${req.method} ${req.url}`);
  console.log(`i am calling .. Task request: ${req.method} ${req.url}`);
  // res.json({
  //   message: "Response sent by middleware",
  // });
  next();
};

const requireApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "API key required",
    });
  }

  next();
};

const checkSomething = (req, res, next) => {
  const valid = true;

  if (!valid) {
    return next(new Error("Something went wrong"));
  }

  next();
};

const validateCreateTask = (req, res, next) => {
  console.log("i am validatedTask middleware called");
  const { title, description } = req.body;
  const allowedFields = ["title", "description"];

  const unknownFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (unknownFields.length > 0) {
    return res.status(400).json({
      error: "Unknown fields",
      fields: unknownFields,
    });
  }

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      error: "Description must be a string",
    });
  }

  next();
};

const normalizeCreateTask = (req, res, next) => {
  console.log("i am normailzie create task middlware called");
  if (typeof req.body.title === "string") {
    req.body.title = req.body.title.trim();
  }

  if (typeof req.body.description === "string") {
    req.body.description = req.body.description.trim();
  }

  next();
};

const validateTaskId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid task ID",
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const { title } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({
      error: "Title must be a string",
    });
  }

  next();
};

const validateTaskQuery = (req, res, next) => {
  const { limit } = req.query;

  if (limit !== undefined) {
    const value = Number(limit);

    if (!Number.isInteger(value) || value <= 0) {
      return res.status(400).json({
        error: "limit must be a positive integer",
      });
    }
  }

  next();
};

const requireAuthorization = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "Authorization header required",
    });
  }

  next();
};

router.use(taskLogger);

router.get("/task", requireApiKey, checkSomething, (req, res) => {
  const contentType = req.headers;
  const version = req.headers["x-client-version"];
  console.log("Header look up: ", contentType);
  console.log("[TASK ROUTE] /task");
  res.json({
    data: contentType,
    version,
  });
});

router.get("/count", (req, res) => {
  res.json({ count: 0 });
});

router.get("/", validateTaskQuery, async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json({
      data: result.rows,
      message: "i ma fron task api get",
    });
  } catch (error) {
    next(error);
  }
  const limit = req.query.limit ? Number(req.query.limit) : undefined;

  res.json({ limit });
});

// router.get("/:id", validateTaskId, (req, res) => {
//   const { id } = req.params;
//   const { include } = req.query;
//   res.json({ id, include });
// });

router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      throw new AppError("Task not found", 404, "TASK_NOT_FOUND");
    }

    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  normalizeCreateTask,
  validateCreateTask,
  async (req, res, next) => {
    console.log("request body post in task api", req.body);

    try {
      const { title, description } = req.body;
      // const { status } = req.query;
      const result = await pool.query(
        `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING *`,
        [title, description],
      );

      res.status(201).json({
        data: result.rows[0],
      });
    } catch (error) {
      // next(error);
      console.log(error);
    }

    // res.status(201).json({
    //   message: "Task created",
    //   title,
    //   description,
    //   data: req.body,
    //   status,
    // });
  },
);

router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  console.log(typeof taskId);
  const id = Number(req.params.id);
  console.log(`tpye of id ${typeof id} and value is ${id}`);

  res.json({
    taskId,
    message: "Task replaced",
  });
});

router.patch("/:id", validateUpdateTask, (req, res) => {
  res.json({ message: "Task updated" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Task deleted" });
});

export default router;
