const fs = require("node:fs");

const stream = fs.createReadStream("data/tasks.json");

stream.on("data", (chunk) => {
  console.log("Received:", chunk.length, "bytes");
});

stream.on("end", () => {
  console.log("Finished reading");
});

stream.on("error", (error) => {
  console.error("Read error:", error);
});
