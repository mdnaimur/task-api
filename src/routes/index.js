/*
 * Title: Centralize Route Registraion
 * Description:
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const registerTaskRoute = require("./taskRoutes");

function registerRoutes(addRoute) {
  registerTaskRoute(addRoute);
}

module.exports = registerRoutes;
