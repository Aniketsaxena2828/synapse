import express from "express"

import authMiddleware
from "../middleware/auth.middleware"

import {
  getDashboardData,
} from "../controllers/dashboard.controller"

const router = express.Router()

router.get(
  "/",
  authMiddleware,
  getDashboardData
)

export default router