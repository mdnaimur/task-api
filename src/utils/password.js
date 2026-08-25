/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 24/08/2026
 */

const crypto = require("node:crypto");

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

function verifyPassword(password, storeHash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = storeHash.split(":");

    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      const storeKey = Buffer.from(key, "hex");
      resolve(
        storeKey.length === derivedKey.length &&
          crypto.timingSafeEqual(storeKey, derivedKey),
      );
    });
  });
}
module.exports = {
  hashPassword,
  verifyPassword,
};
