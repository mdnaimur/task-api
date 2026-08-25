/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

// const authController = require("../controllers/authController");

// const authRoutes = [
//   {
//     method: "POST",
//     path: "/auth/register",
//     handler: authController.register,
//   },
// ];

function registerAuthRoute(addRoute, { authController }) {
  addRoute("POST", "/auth/register", authController.register);
  addRoute("POST", "/auth/login", authController.login);
}

// module.exports = authRoutes;
module.exports = registerAuthRoute;
