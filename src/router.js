/*
 * Title: Router
 * Description: Here all router setup
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

const routes = [];

function addRoute(method, path, handler) {
  routes.push({
    method,
    path,
    handler,
  });
}

function findRoute(method, path) {
  return routes.find((route) => route.method === method && route.path === path);
}

module.exports = {
  addRoute,
  findRoute,
};
