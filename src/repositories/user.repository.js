/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

export const createUser = async (email, passwordHash) => {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at
    `,
    [email, passwordHash],
  );

  return result.rows[0];
};

export const updateTask = async (id, userId, title, description) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET
      title = $1,
      description = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
      AND user_id = $4
    RETURNING id, user_id, title, description, completed
    `,
    [title, description, id, userId],
  );

  return result.rows[0] || null;
};

export const deleteTask = async (id, userId) => {
  const result = await pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
      AND user_id = $2
    RETURNING id
    `,
    [id, userId],
  );

  return result.rows[0] || null;
};
