/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 26/08/2026
 */

const taskRepository = require("../repositories/taskRepository");
const { AppError } = require("../errors");

async function requireTaskOwner(req, res) {
  const task = await taskRepository.findById(req.params.id);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  if (task.userId !== req.user.id) {
    throw new AppError(403, "You do not have permission to access this task");
  }

  req.task = task;
}
