/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

import bcrypt from "bcrypt";
import { createUser } from "../repositories/user.repository.js";

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await createUser(email, passwordHash);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    }

    res.json({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});
