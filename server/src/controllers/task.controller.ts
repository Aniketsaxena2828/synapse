import { Response }
from "express"

import Task
from "../models/task.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

export const getTasks =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const tasks =
        await Task.find({

          workspaceId:
            req.params.workspaceId,

        })

      res.status(200).json(
        tasks
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const createTask =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const task =
        await Task.create({

          title:
            req.body.title,

          status:
            "todo",

          workspaceId:
            req.body.workspaceId,

          createdBy:
            req.userId,
        })

      res.status(201).json(
        task
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const updateTask =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const task =
        await Task.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        )

      res.status(200).json(
        task
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const deleteTask =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      )

      res.status(200).json({
        message:
          "Task deleted",
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }