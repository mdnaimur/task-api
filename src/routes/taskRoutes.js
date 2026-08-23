/*
 * Title: Task Route
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const {
  createTaskController,
  deleteTaskController,
  getTaskCotroller,
  updateTaskController,
  getTasksController,
} = require("../controllers/taskController");

function registerTaskRoute(addRoute) {
  addRoute("POST", "/tasks", createTaskController);
  addRoute("GET", "/tasks", getTasksController);
  addRoute("GET", "/tasks/:id", getTaskCotroller);
  addRoute("PATCH", "/tasks/:id", updateTaskController);
  addRoute("DELETE", "/tasks/:id", deleteTaskController);
}

module.exports = registerTaskRoute;
