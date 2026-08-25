const { registerUser } = require("./services/userService");

async function main() {
  const user = await registerUser("test@example.com", "hello123");

  console.log(user);
}

main();
