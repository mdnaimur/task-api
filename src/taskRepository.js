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

// async function writeTasks(tasks) {
//   await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
// }

/**
 *
 * concurrrencty  write  problem solve
 */

let writeQueue = Promise.resolve();

function writeTasks(tasks) {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(filePath, JSON.stringify(tasks, null, 2)),
  );
  return writeQueue;
}

async function findAll() {
  return readTasks();
}

async function findById(id) {
  const tasks = await readTasks();
  return tasks.find((task) => task.id === id) || null;
}

async function create(task) {
  const tasks = await readTasks();

  tasks.push(task);
  await writeTasks(tasks);
  return task;
}

async function update(id, changes) {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }
  Object.assign(task, changes);
  await writeTasks(tasks);
  return task;
}

async function remove(id) {
  const tasks = await readTasks();

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return false;
  }
  tasks.splice(index, 1);
  await writeTasks(tasks);
  return true;
}

module.exports = {
  readTasks,
  writeTasks,
  findAll,
  findById,
  create,
  update,
  remove,
};
