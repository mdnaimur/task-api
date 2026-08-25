/*
 * Title: User service
 * Description: user related
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

const crypto = require("node:crypto");

// custom import
const userRepository = require("../repositories/userRepository");

const { hashPassword, verifyPassword } = require("../utils/password");

const { AppError } = require("../errors");
const { createToken } = require("../utils/token.mjs");

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
    password: passwordHash,
  };

  return userRepository.create(user);
}

async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await userRepository.findByEmail(normalizedEmail);
  if (!user) {
    throw new AppError(401, "invalid email or password");
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = await createToken(user.id);

  // save token/session here

  return { user, token };
}

module.exports = {
  registerUser,
  loginUser,
};
