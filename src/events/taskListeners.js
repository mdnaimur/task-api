/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

const taskEvents = require("./taskEvents");

const logger = require("../utils/logger");

console.log("Task listeners loaded");
taskEvents.on("task.created", (task) => {
  // console.log(`[EVENT] 🔥  Task created: ${task.id}`);
  logger.info(`[${new Date().toISOString()}][INFO]TASK CREATED`, {
    id: task.id,
  });
});

// taskEvents.on("task.created", (task) => {
//   console.log(`[AUDIT] New task: ${task.title}`);
// });

taskEvents.on("task.updated", (task) => {
  // console.log(`[EVENT] Task updated: ${task.id}`);
  logger.info("TASK updated", { id });
});

taskEvents.on("task.deleted", ({ id }) => {
  // console.log(`[EVENT] Task deleted: ${id}`);
  logger.info("TASK updated", { id });
});
