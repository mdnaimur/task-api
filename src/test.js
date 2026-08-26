// const { registerUser } = require("./services/userService");

// async function main() {
//   const user = await registerUser("test@example.com", "hello123");

//   console.log(user);
// }

const { createToken, verifyToken } = require("./utils/token.mjs");

async function main() {
  const token = await createToken("user-123");

  console.log("TOKEN:");
  console.log(token);

  const payload = await verifyToken(token);

  console.log("PAYLOAD:");
  console.log(payload);
}

main();
