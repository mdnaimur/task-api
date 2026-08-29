/*
 * Title: Task Controller
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} = require("../services/taskService");

const { validateTask, validateTaskUpdate } = require("../validators");
const parseJsonBody = require("../bodyParser");
const { AppError } = require("../errors");
const { sendJson } = require("../utils/http");

function createTaskController(taskService) {
  async function createTaskController(req, res) {
    const body = await parseJsonBody(req);

    console.log("inside controler [🤷‍♂️⭕]:", req);
    const errors = validateTask(body);

    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, {
        error: "Validation failed",
        details: errors,
      });

      return;
    }

    const task = await taskService.createTask(body, "user");

    sendJson(res, 201, task);
  }

  async function getTasksController(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const page = Number(url.searchParams.get("page") || 1);

    const limit = Number(url.searchParams.get("limit") || 20);

    if (!Number.isInteger(page) || page < 1) {
      throw new AppError(400, "page must be positive integer");
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new AppError(400, "Limit must be between 1 to 100");
    }

    // const offset = (page - 1) * limit;
    // console.log(`limit: ${limit} offset: ${offset}`);

    const tasks = await taskService.getTasks({
      page,
      limit,
    });

    const totalPages = Math.ceil(tasks.length / limit);
    sendJson(res, 200, tasks);
  }

  // async function getTasksController(req, res) {
  //   const tasks = await taskService.getTasks();

  //   sendJson(res, 200, tasks);
  // }

  async function getTaskCotroller(req, res, { params }) {
    console.log("i am get task controller from params controler");
    const task = await taskService.getTaskById(params.id, req.user.id);

    if (!task) {
      throw new AppError(404, "Task not found");
    }

    sendJson(res, 200, task);
  }

  async function updateTaskController(req, res, { params }) {
    const body = await parseJsonBody(req);
    const errors = validateTaskUpdate(body);

    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, {
        error: "Validation error",
        details: errors,
      });

      return;
    }

    const task = await taskService.updateTask(params.id, body, req.user.id);
    if (!task) {
      throw new AppError(404, "Task not found");
    }

    sendJson(res, 200, task);
  }

  async function deleteTaskController(req, res, { params }) {
    const deleted = await taskService.deleteTask(params.id, req.user.id);
    if (!deleted) {
      throw new AppError(404, "Task not found");
    }

    res.statusCode = 204;
    res.end();
  }

  return {
    createTaskController,
    getTaskCotroller,
    getTasksController,
    updateTaskController,
    deleteTaskController,
  };
}

module.exports = createTaskController;
