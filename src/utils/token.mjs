/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

import { SignJWT } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is required");
}

const secretKey = new TextEncoder().encode(secret);

export async function createToken(userId) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);
}
