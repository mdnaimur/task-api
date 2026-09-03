/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(
      new AppError("Authentication required", 401, "AUTHENTICATION_REQUIRED"),
    );
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401, "INVALID_TOKEN"));
  }
};

export default authenticate;
