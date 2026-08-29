/*
 * Title: Task Repository
 * Description: file handle in this area with Postgre
 * Author: Md Naimur Rahman
 * Date: 29/08/2026
 */

const pool = require("../config/database");

async function findAll({
  userId,
  completed,
  search,
  offset = 0,
  limit = 20,
} = {}) {
  const values = [];

  let query = `
    SELECT
      id,
      user_id,
      title,
      completed,
      created_at
    FROM tasks
    WHERE user_id = $1
  `;

  // IMPORTANT
  values.push(userId);

  if (completed !== undefined) {
    values.push(completed);

    query += `
      AND completed = $${values.length}
    `;
  }

  if (search) {
    values.push(`%${search}%`);

    query += `
      AND title ILIKE $${values.length}
    `;
  }

  query += `
    ORDER BY created_at DESC
  `;

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  query += `
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  console.log("QUERY:", query);
  console.log("VALUES:", values);

  const result = await pool.query(query, values);

  return result.rows;
}
async function findById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        title,
        completed,
        created_at
      FROM tasks
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
}

async function create(task) {
  const result = await pool.query(
    `
      INSERT INTO tasks (
        id,
        user_id,
        title,
        completed
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        user_id,
        title,
        completed,
        created_at
    `,
    [task.id, task.userId, task.title, task.completed],
  );

  return result.rows[0];
}

async function update(id, changes) {
  const fields = [];
  const values = [];

  if (changes.title !== undefined) {
    values.push(changes.title);
    fields.push(`title = $${values.length}`);
  }

  if (changes.completed !== undefined) {
    values.push(changes.completed);
    fields.push(`completed = $${values.length}`);
  }

  if (fields.length === 0) {
    return findById(id);
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE tasks
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING
        id,
        user_id,
        title,
        completed,
        created_at
    `,
    values,
  );

  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING id
    `,
    [id],
  );

  return result.rowCount > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
