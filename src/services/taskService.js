/*
 * Title: task service
 * Description: all service get, post , update , delete opearation this file
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const taskEvents = require("../events/taskEvents");

function createTaskService(taskRepository) {
  async function createTask(data) {
    const task = {
      id: Date.now().toString(),
      title: data.title.trim(),
      completed: data.completed ?? false,
    };

    const createdTask = await taskRepository.create(task);

    taskEvents.emit("task.created", createdTask);
    return createdTask;
  }

  async function getTasks() {
    return taskRepository.findAll();
  }

  async function getTaskById(id) {
    return taskRepository.findById(id);
  }

  async function updateTask(id, data) {
    const changes = {};

    if (data.title !== undefined) {
      changes.title = data.title.trim();
    }

    if (data.completed !== undefined) {
      changes.completed = data.completed;
    }

    const updatedTask = taskRepository.update(id, changes);

    if (updatedTask) {
      taskEvents.emit("task.updated", updatedTask);
    }

    return updatedTask;
  }

  async function deleteTask(id) {
    const deleted = taskRepository.remove(id);
    if (deleted) {
      taskEvents.emit("task.deleted", {
        id,
      });
    }

    return deleted;
  }

  return {
    createTask,
    getTaskById,
    getTasks,
    updateTask,
    deleteTask,
  };
}

module.exports = createTaskService;
