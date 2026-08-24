/*
 * Title: Centralize Route Registraion
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const registerTaskRoute = require("./taskRoutes");

function registerRoutes(addRoute, { taskController }) {
  registerTaskRoute(addRoute, { taskController });
}

module.exports = registerRoutes;
