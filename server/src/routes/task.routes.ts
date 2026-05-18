import express from "express"

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller"

import authMiddleware
from "../middleware/auth.middleware"

const router = express.Router()

router.post(
  "/",
  authMiddleware,
  createTask
)

router.get(
  "/",
  authMiddleware,
  getTasks
)

router.patch(
  "/:taskId/status",
  authMiddleware,
  updateTaskStatus
)

router.delete(
  "/:taskId",
  authMiddleware,
  deleteTask
)

export default router