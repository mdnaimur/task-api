/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

const requestHandler = require("./requestHandler");
const taskRepository = require("./taskRepository");

const createTaskService = require("./services/taskService");

const createTaskController = require("./controllers/taskController");

const registerRoutes = require("./routes");
const { addRoute } = require("./router");

require("./events/taskListeners");

const taskService = createTaskService(taskRepository);
const taskController = createTaskController(taskService);

registerRoutes(addRoute, {
  taskController,
});

module.exports = requestHandler;
