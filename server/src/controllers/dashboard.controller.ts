import { Response } from "express"

import Task from "../models/task.model"

import Project from "../models/project.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

export const getDashboardData =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const tasks =
  await Task.find({
    workspaceId: {
      $exists: true,
    },
  }).sort({
    createdAt: -1,
  })

    const totalTasks =
      tasks.length

    const completedTasks =
      tasks.filter(
        (task: any) =>
          task.status ===
          "completed"
      ).length

    const progressTasks =
      tasks.filter(
        (task: any) =>
          task.status ===
          "progress"
      ).length

    const overdueTasks =
      tasks.filter(
        (task: any) =>
          task.status ===
          "todo"
      ).length

    const totalProjects =
      await Project.countDocuments({})

    const recentTasks =
      tasks
        .filter(
          (task: any) =>
            task.status !==
            "completed"
        )
        .slice(0, 6)

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
      message:
        "Server Error",
    })
  }
}