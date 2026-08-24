/*
 * Title: task service
 * Description: all service get, post , update , delete opearation this file
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const { readTasks, writeTasks } = require("../taskRepository");

async function createTask(data) {
  const tasks = await readTasks();

  const task = {
    id: Date.now().toString(),
    title: data.title.trim(),
    completed: data.completed ?? false,
  };

  tasks.push(task);
  await writeTasks(tasks);

  return task;
}

async function getTasks() {
  return await readTasks();
}

async function getTaskById(id) {
  const tasks = await readTasks();

  return tasks.find((task) => task.id === id) || null;
}

async function updateTask(id, data) {
  const tasks = await readTasks();
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }

  if (data.title !== undefined) {
    task.title = data.title.trim();
  }

  if (data.completed !== undefined) {
    task.completed = data.completed;
  }

  await writeTasks(tasks);

  return task;
}

async function deleteTask(id) {
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
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  deleteTask,
};
