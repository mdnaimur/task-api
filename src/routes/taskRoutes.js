/*
 * Title: Task Route
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

// const {
//   createTaskController,
//   deleteTaskController,
//   getTaskCotroller,
//   updateTaskController,
//   getTasksController,
// } = require("../controllers/taskController");

function registerTaskRoute(addRoute, { taskController  }) {
  addRoute("POST", "/tasks", taskController.createTaskController);
  addRoute("GET", "/tasks", taskController.getTasksController);
  addRoute("GET", "/tasks/:id", taskController.getTaskCotroller);
  addRoute("PATCH", "/tasks/:id", taskController.updateTaskController);
  addRoute("DELETE", "/tasks/:id", taskController.deleteTaskController);
}

module.exports = registerTaskRoute;
