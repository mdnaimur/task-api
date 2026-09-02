import express from "express";

const router = express.Router();

// console.log("I am task router: ", router);

const taskLogger = (req, res, next) => {
  console.log(`Task request: ${req.method} ${req.url}`);
  next();
};

router.use(taskLogger);

router.get("/", (req, res) => {
  res.json([]);
});

router.get("/count", (req, res) => {
  res.json({ count: 0 });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { include } = req.query;
  res.json({ id, include });
});

router.post("/", (req, res) => {
  res.json({ message: "task created" });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Task replaced" });
});

router.patch("/:id", (req, res) => {
  res.json({ message: "Task updated" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Task deleted" });
});

export default router;
