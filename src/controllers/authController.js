/*
 * Title: auth controller
 * Description:
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

const userService = require("../services/userService");
const { sendJson } = require("../utils/http");
const parseJsonBody = require("../bodyParser");
const { AppError } = require("../errors");
const logger = require("../utils/logger");

function createAuthController(userService) {
  async function register(req, res) {
    const body = await parseJsonBody(req);

    console.log(
      `email is ${typeof body.email} and password is: ${body.password}`,
    );

    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.password !== "string"
    ) {
      throw new AppError(400, "Email and password are required");
    }

    const { email, password } = body;
    // logger.info(email);
    console.log(`email is ${email} and password is: ${password}`);

    if (!email.trim()) {
      throw new AppError(400, "Email is required");
    }

    if (password.length < 8) {
      throw new AppError(400, "password must be at least 8 charecters");
    }

    const user = await userService.registerUser(email, password);
    sendJson(res, 201, {
      id: user.id,
      email: user.email,
    });
  }

  async function login(req, res) {
    const body = await parseJsonBody(req);

    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.password !== "string"
    ) {
      throw new AppError(400, "Email and password are required");
    }

    const { email, password } = body;

    // const { user, token } = await userService.loginUser(email, password);
    const result = await userService.loginUser(email, password);

    console.log("LOGIN RESULT:", result);
    const { user, token } = result;

    sendJson(res, 200, {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  }

  return {
    register,
    login,
  };
}

module.exports = createAuthController;
