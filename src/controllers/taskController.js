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

    const errors = validateTask(body);

    if (Object.keys(errors).length > 0) {
      sendJson(res, 400, {
        error: "Validation failed",
        details: errors,
      });

      return;
    }

    const task = await taskService.createTask(body, req.user.id);

    sendJson(res, 201, task);
  }

  async function getTasksController(req, res) {
    const tasks = await taskService.getTasks();

    sendJson(res, 200, tasks);
  }

  async function getTaskCotroller(req, res, { params }) {
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
