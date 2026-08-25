/*
 * Title: User service
 * Description: user related
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

const crypto = require("node:crypto");

// custom import
const userRepository = require("../repositories/userRepository");

const { hashPassword } = require("../utils/password");

const { AppError } = require("../errors");

async function registerUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await userRepository.findByEmail(normalizedEmail);
  if (existingUser) {
    throw new AppError(409, "Email already registered");
  }

  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password: hashPassword,
  };

  return userRepository.create(user);
}

module.exports = {
  registerUser,
};
