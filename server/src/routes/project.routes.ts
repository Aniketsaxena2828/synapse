import express from "express"

import authMiddleware
from "../middleware/auth.middleware"

import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/project.controller"

const router = express.Router()
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
)

router.post(
  "/",
  authMiddleware,
  createProject
)

router.get(
  "/",
  authMiddleware,
  getProjects
)

export default router