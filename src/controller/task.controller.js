/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

import { createTask as createTaskRepository } from "../repositories/task.repository.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await createTaskRepository(req.user.id, title, description);

    res.status(201).json({
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
