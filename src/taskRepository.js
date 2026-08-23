/*
 * Title: Task Repository
 * Description: file handle in this area
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const fs = require("node:fs/promises");
const path = require("node:path");

// area to save local
const filePath = path.join(__dirname, "..", "data", "tasks.json");

async function readTasks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeTasks(tasks) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = {
  readTasks,
  writeTasks,
};
