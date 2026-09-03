/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

import pool from "../db/pool.js";

export const findAllTasks = async () => {
  const result = await pool.query(`
    SELECT id, title, description, completed
    FROM tasks
    ORDER BY id
  `);

  return result.rows;
};

export const findTaskById = async (id) => {
  const result = await pool.query(
    `
    SELECT id, title, description, completed
    FROM tasks
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

export const createTask = async (title, description) => {
  const result = await pool.query(
    `
    INSERT INTO tasks (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description, completed
    `,
    [title, description],
  );

  return result.rows[0];
};

export const updateTask = async (id, title, description) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET
      title = $1,
      description = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id, title, description, completed
    `,
    [title, description, id],
  );

  return result.rows[0] || null;
};

export const deleteTask = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id
    `,
    [id],
  );

  return result.rows[0] || null;
};
