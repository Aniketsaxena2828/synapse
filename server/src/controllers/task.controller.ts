import { Response } from "express"

import Task from "../models/task.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

import { getIO }
from "../config/socket"

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    console.log("BODY:", req.body)

    if (!req.body) {
      return res.status(400).json({
        message: "Body missing",
      })
    }

    const {
      title,
      description,
      projectId,
    } = req.body

    if (!title) {
      return res.status(400).json({
        message: "Title required",
      })
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      owner: req.userId,
    })

    getIO().emit(
      "taskCreated",
      task
    )

    res.status(201).json(task)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const tasks =
      await Task.find({
        owner: req.userId,
      })

    res.status(200).json(tasks)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export const updateTaskStatus = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { taskId } = req.params

    const { status } = req.body

    const updatedTask =
      await Task.findByIdAndUpdate(
        taskId,
        {
          status,
        },
        {
          new: true,
        }
      )

    getIO().emit(
      "taskUpdated",
      updatedTask
    )

    res.status(200).json(updatedTask)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}
export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { taskId } = req.params

    await Task.findByIdAndDelete(
      taskId
    )

    getIO().emit(
      "taskDeleted",
      taskId
    )

    res.status(200).json({
      message: "Task deleted",
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}