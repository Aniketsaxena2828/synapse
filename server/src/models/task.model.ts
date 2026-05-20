import mongoose from "mongoose"

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "todo",
          "progress",
          "completed",
        ],

        default: "todo",
      },

      workspaceId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Workspace",

        required: true,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      description: {
        type: String,
        default: "",
      },
    },

    {
      timestamps: true,
    }
  )

const Task =
  mongoose.model(
    "Task",
    taskSchema
  )

export default Task