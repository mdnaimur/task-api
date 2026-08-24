/*
 * Title: task service
 * Description: all service get, post , update , delete opearation this file
 * Author: Md Naimur Rahman
 * Date: 23/08/2026
 */

function createTaskService(taskRepository) {
  async function createTask(data) {
    const task = {
      id: Date.now().toString(),
      title: data.title.trim(),
      completed: data.completed ?? false,
    };

    return taskRepository.create(task);
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

    return taskRepository.update(id, changes);
  }

  async function deleteTask(id) {
    return taskRepository.remove(id);
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
