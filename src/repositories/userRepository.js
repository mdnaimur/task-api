/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.join(process.cwd(), "data", "users.json");

async function findByEmail(email) {
  const data = await fs.readFile(filePath, "utf-8");
  const users = JSON.parse(data);

  return users.find((user) => user.email === email) ?? null;
}

async function create(user) {
  const data = await fs.readFile(filePath, "utf-8");

  const users = JSON.parse(data);
  users.push(user);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return user;
}

module.exports = {
  findByEmail,
  create,
};
