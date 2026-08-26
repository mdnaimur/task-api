/*
 * Title: Authentication middleware
 * Description:
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

const { verifyToken } = require("../utils/token.mjs");
const { AppError } = require("../errors");

async function authenticate(req, res) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(401, "Authentication required🎯");
  }

  const [schema, token] = authorization.split(" ");
  if (schema !== "Bearer" || !token) {
    throw new AppError(401, "Invalid authorization header");
  }
  //   console.log("Authorization:", authorization);
  // console.log("Schema:", schema);
  // console.log("Token:", token);
  try {
    console.log("TOKEN:", token);
    const payload = await verifyToken(token);
    console.log("PAYLOAD:", payload);
    if (!payload.sub) {
      throw new AppError(401, "invalid token");
    }
    req.user = {
      id: payload.sub,
    };
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(401, "invalid or exprired token");
  }
}

module.exports = {
  authenticate,
};
