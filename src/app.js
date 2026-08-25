/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

const requestHandler = require("./requestHandler");
const taskRepository = require("./repositories/taskRepository");

const createTaskService = require("./services/taskService");

const createTaskController = require("./controllers/taskController");

// auth
const createAuthController = require("./controllers/authController");
const userService = require("./services/userService");
const registerRoutes = require("./routes");
const { addRoute } = require("./router");

require("./events/taskListeners");

const taskService = createTaskService(taskRepository);
const taskController = createTaskController(taskService);

const authController = createAuthController(userService);

registerRoutes(addRoute, {
  taskController,
  authController,
});

module.exports = requestHandler;
