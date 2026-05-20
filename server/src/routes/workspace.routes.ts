import express from "express"

import authMiddleware
from "../middleware/auth.middleware"

import {
  createWorkspace,
  getWorkspaces,
  joinWorkspace,
  deleteWorkspace,
  leaveWorkspace,
  removeMember,
  addRule,
} from "../controllers/workspace.controller"

const router =
  express.Router()
router.delete(
  "/:id",
  authMiddleware,
  deleteWorkspace
)
router.put(
  "/:id/leave",
  authMiddleware,
  leaveWorkspace
)
router.put(
  "/:id/remove-member",
  authMiddleware,
  removeMember
)
router.post(
  "/create",
  authMiddleware,
  createWorkspace
)
router.post(
  "/:id/rules",
  authMiddleware,
  addRule
)
router.get(
  "/",
  authMiddleware,
  getWorkspaces
)

router.post(
  "/join",
  authMiddleware,
  joinWorkspace
)

export default router