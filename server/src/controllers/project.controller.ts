import { Response } from "express"

import Project from "../models/project.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

export const createProject = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    console.log("BODY:", req.body)

    console.log("USER:", req.userId)

    const {
      title,
      description,
    } = req.body

    const project =
      await Project.create({
        title,
        description,
        owner: req.userId,
      })

    console.log("PROJECT CREATED")

    res.status(201).json(project)

  } catch (error) {

    console.log("PROJECT ERROR:", error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}

export const getProjects = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const projects =
      await Project.find({
        owner: req.userId,
      })

    res.status(200).json(projects)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error",
    })
  }
}