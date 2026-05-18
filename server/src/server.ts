import dotenv from "dotenv"

dotenv.config()

import http from "http"

import app from "./app"

import connectDB
from "./config/db"

const PORT =
  process.env.PORT || 5000

const startServer =
async () => {

  try {

    await connectDB()

    const server =
      http.createServer(app)

    server.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        )
      }
    )

  } catch (error) {

    console.log(error)
  }
}

startServer()