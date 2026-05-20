import express
from "express"

import authMiddleware
from "../middleware/auth.middleware"

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller"

const router =
  express.Router()

router.get(
  "/:workspaceId",
  authMiddleware,
  getTasks
)

router.post(
  "/",
  authMiddleware,
  createTask
)

router.put(
  "/:id",
  authMiddleware,
  updateTask
)

router.delete(
  "/:id",
  authMiddleware,
  deleteTask
)

export default router