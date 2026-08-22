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
  for (const route of routes) {
    if (route.method !== method) {
      continue;
    }
    const routeParts = route.path.split("/");
    const pathParts = path.split("/");

    if (routeParts.length !== pathParts.length) {
      continue;
    }

    const params = {};
    let matched = true;

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(":")) {
        const paramName = routePart.slice(1);
        params[paramName] = pathPart;
      } else if (routePart !== pathPart) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return {
        ...route,
        params,
      };
    }
  }
  //   return routes.find((route) => route.method === method && route.path === path);
  return null;
}

function findPath(path) {
  return routes.some((route) => route.path === path);
}

module.exports = {
  addRoute,
  findRoute,
  findPath,
};
