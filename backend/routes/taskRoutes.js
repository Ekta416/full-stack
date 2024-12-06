const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTaskStatus, deleteTask, editTask,getTaskById } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, editTask);
router.delete("/:id", authMiddleware, deleteTask);

// router.put("/status", authMiddleware, updateTaskStatus);
router.put("/tasks/:id/status", authMiddleware, updateTaskStatus);


module.exports = router;
