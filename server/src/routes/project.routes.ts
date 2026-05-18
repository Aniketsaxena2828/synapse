import express from "express"

import authMiddleware
from "../middleware/auth.middleware"

import {
  createProject,
  getProjects,
} from "../controllers/project.controller"

const router = express.Router()

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