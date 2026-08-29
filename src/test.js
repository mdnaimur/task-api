// const { registerUser } = require("./services/userService");

// async function main() {
//   const user = await registerUser("test@example.com", "hello123");

//   console.log(user);
// }

// const { createToken, verifyToken } = require("./utils/token.mjs");

// async function main() {
//   const token = await createToken("user-123");

//   console.log("TOKEN:");
//   console.log(token);

//   const payload = await verifyToken(token);

//   console.log("PAYLOAD:");
//   console.log(payload);
// }

// main();

require("dotenv").config();

const pool = require("./config/database");

async function main() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log(result.rows[0]);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    await pool.end();
  }
}

main();
