import express from "express";

import taskRoute from "./routes/task.routes.js";

const app = express();


app.use((req, res, next) => {
  console.log("Middleware 1");

  console.log("Before");

  next();

  console.log("After");
  //   next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// app.use("/tasks", taskRoute);
app.get("/tasks", (req, res) => {
  console.log("Route");
  res.json([]);
});

app.get("/health", (req, res) => {
  res.json({ status: "Ok" });
});

app.listen(3000, () => {
  console.log("task api running on port 3000");
});
