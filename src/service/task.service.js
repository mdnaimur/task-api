/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

import { createTask as createTaskRepository } from "../repositories/task.repository.js";

export const createTask = async (userId, title, description) => {
  // Business rules can live here.

  const task = await createTaskRepository(userId, title, description);

  return task;
};
