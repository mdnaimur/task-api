/**
 * Title: Task Service
 * Description: All task business operations
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const taskEvents = require("../events/taskEvents");
const { AppError } = require("../errors");

function createTaskService(taskRepository) {
  async function createTask(data, userId) {
    const task = {
      id: Date.now().toString(),
      userId,
      title: data.title.trim(),
      completed: data.completed ?? false,
    };

    const createdTask = await taskRepository.create(task);

    taskEvents.emit("task.created", createdTask);

    return createdTask;
  }

  async function getTasks(userId) {
    const tasks = await taskRepository.findAll();

    return tasks.filter((task) => task.userId === userId);
  }

  async function getTaskById(id, userId) {
    const task = await taskRepository.findById(id);

    if (!task) {
      return null;
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You do not have permission to access this task");
    }

    return task;
  }

  async function updateTask(id, data, userId) {
    const task = await taskRepository.findById(id);

    if (!task) {
      return null;
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You do not have permission to update this task");
    }

    const changes = {};

    if (data.title !== undefined) {
      changes.title = data.title.trim();
    }

    if (data.completed !== undefined) {
      changes.completed = data.completed;
    }

    const updatedTask = await taskRepository.update(id, changes);

    if (updatedTask) {
      taskEvents.emit("task.updated", updatedTask);
    }

    return updatedTask;
  }

  async function deleteTask(id, userId) {
    const task = await taskRepository.findById(id);

    if (!task) {
      return null;
    }

    if (task.userId !== userId) {
      throw new AppError(403, "You do not have permission to delete this task");
    }

    const deleted = await taskRepository.remove(id);

    if (deleted) {
      taskEvents.emit("task.deleted", {
        id,
      });
    }

    return deleted;
  }

  return {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
  };
}

module.exports = createTaskService;
