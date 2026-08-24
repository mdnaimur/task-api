const { hashPassword } = require("./utils/password");

async function main() {
  const hash1 = await hashPassword("hello123");
  const hash2 = await hashPassword("hello123");

  console.log(hash1);
  console.log(hash2);
}

main();
