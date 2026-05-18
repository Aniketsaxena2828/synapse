import { Response }
from "express"

import Task
from "../models/task.model"

import Project
from "../models/project.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

export const getDashboardData =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId = req.userId

    const totalTasks =
      await Task.countDocuments({
        owner: userId,
      })

    const completedTasks =
      await Task.countDocuments({
        owner: userId,
        status: "done",
      })

    const progressTasks =
      await Task.countDocuments({
        owner: userId,
        status: "progress",
      })

    const overdueTasks =
      await Task.countDocuments({
        owner: userId,
        status: "todo",
      })

    const totalProjects =
      await Project.countDocuments({
        owner: userId,
      })

    const recentTasks =
      await Task.find({
        owner: userId,
      })

      .sort({
        createdAt: -1,
      })

      .limit(4)

    res.status(200).json({

      totalTasks,

      completedTasks,

      progressTasks,

      overdueTasks,

      totalProjects,

      recentTasks,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}