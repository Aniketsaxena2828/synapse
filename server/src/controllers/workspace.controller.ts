import { Response }
from "express"

import Workspace
from "../models/workspace.model"

import {
  AuthRequest,
} from "../middleware/auth.middleware"

function generateCode() {

  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

export const createWorkspace =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const {
        name,
        isPrivate,
      } = req.body
      if (!req.userId) {
  return res.status(401).json({
    message: "Unauthorized",
  })
}
      const workspace =
        await Workspace.create({

          name,

          isPrivate,

          inviteCode:
            generateCode(),

          owner:
            req.userId,

          members: [
            req.userId,
          ],
        })

      res.status(201).json(
        workspace
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const getWorkspaces =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const myWorkspaces =
        await Workspace.find({

          members: req.userId,

        }).populate(
          "members",
          "name email"
        )

      const publicWorkspaces =
        await Workspace.find({

          isPrivate: false,

          members: {
            $ne: req.userId,
          },

        }).populate(
          "members",
          "name email"
        )

      res.status(200).json({

        myWorkspaces,

        publicWorkspaces,

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const joinWorkspace =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { code } =
        req.body

      const workspace =
        await Workspace.findOne({
          inviteCode: code,
        })

      if (!workspace) {

        return res.status(404)
          .json({
            message:
              "Workspace not found",
          })
      }

      const alreadyMember =
        workspace.members.includes(
          req.userId as any
        )

      if (!alreadyMember) {

        workspace.members.push(
          req.userId as any
        )

        await workspace.save()
      }

      res.status(200).json(
        workspace
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const removeMember =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const workspace =
        await Workspace.findById(
          req.params.id
        )

      if (!workspace) {

        return res.status(404)
          .json({
            message:
              "Workspace not found",
          })
      }

      if (
        workspace.owner?.toString()
        !== req.userId
      ) {

        return res.status(403)
          .json({
            message:
              "Only owner can remove members",
          })
      }

      workspace.members =
        workspace.members.filter(
          (member: any) =>
            member.toString()
            !== req.body.memberId
        )

      await workspace.save()

      res.status(200).json(
        workspace
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const addRule =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const workspace =
        await Workspace.findById(
          req.params.id
        )

      if (!workspace) {

        return res.status(404)
          .json({
            message:
              "Workspace not found",
          })
      }

      if (
        workspace.owner?.toString()
        !== req.userId
      ) {

        return res.status(403)
          .json({
            message:
              "Only owner can add rules",
          })
      }

      workspace.rules.push({
        text:
          req.body.text,
      } as any)

      await workspace.save()

      res.status(200).json(
        workspace
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }

export const deleteWorkspace =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const workspace =
        await Workspace.findById(
          req.params.id
        )

      if (!workspace) {

        return res.status(404)
          .json({
            message:
              "Workspace not found",
          })
      }

      if (
        workspace.owner?.toString()
        !== req.userId
      ) {

        return res.status(403)
          .json({
            message:
              "Only owner can delete",
          })
      }

      await workspace.deleteOne()

      res.status(200).json({
        message:
          "Workspace deleted",
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }
  export const leaveWorkspace =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const workspace =
        await Workspace.findById(
          req.params.id
        )

      if (!workspace) {

        return res.status(404)
          .json({
            message:
              "Workspace not found",
          })
      }

      workspace.members =
        workspace.members.filter(
          (member: any) =>
            member.toString()
            !== req.userId
        )

      await workspace.save()

      res.status(200).json(
        workspace
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          "Server Error",
      })
    }
  }