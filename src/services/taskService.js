/*
 * Title: task service
 * Description: all service get, post , update , delete opearation this file
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

const taskEvents = require("../events/taskEvents");

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

  // async function getTasks() {
  //   const tasks = await taskRepository.findAll();
  //   return tasks;
  //   // return tasks.filter((task) => task.userId === userId);
  // }

  async function getTasks({ page = 0, limit = 20 } = {}) {
    const tasks = await taskRepository.findAll();

    const total = tasks.length;
    const offset = (page - 1) * limit;

    const data = tasks.slice(offset, offset + limit);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
      },
    };

    // return tasks.slice(offset, offset + limit);
    // return tasks;
    // return tasks.filter((task) => task.userId === userId);
  }

  async function getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) {
      return null;
    }
    if (task.userId !== userId) {
      throw new AppError(403, "You do not have permission to access this task");
    }
    return task;
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
