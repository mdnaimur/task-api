/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 30/08/2026
 */

import express from "express";

const app = express();
app.use(express.json());

// console.log(app);

app.get("/health", (req, res) => {
  console.log(req.body);
  res.json({
    status: "ok",
  });
});

const tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build Task API", done: false },
];

app.post("/tasks", (req, res) => {
  res.status(201).json({ message: "Task would be created here" });
});

app.put("/tasks/:id", (req, res) => {
  console.log(req.body);
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

app.get("/about", (req, res) => {
  res.json({
    name: "Task Management API",
    version: "1.0.0",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
