import mongoose from "mongoose"

const workspaceSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      inviteCode: {
        type: String,
        required: true,
        unique: true,
      },

      isPrivate: {
        type: Boolean,
        default: false,
      },

      owner: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      members: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "User",
        },
      ],

      rules: [
        {
          text: String,

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    {
      timestamps: true,
    }
  )

export default mongoose.model(
  "Workspace",
  workspaceSchema
)