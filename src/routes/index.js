/*
 * Title: Centralize Route Registraion
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const registerTaskRoute = require("./taskRoutes");
const registerAuthRoute = require("./authRoutes");

function registerRoutes(addRoute, { taskController, authController }) {
  registerTaskRoute(addRoute, { taskController });
  registerAuthRoute(addRoute, { authController });
}

module.exports = registerRoutes;
