import dotenv from "dotenv"

dotenv.config()

import http from "http"

import app from "./app"

import connectDB from "./config/db"

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    console.log("Connecting DB...")

    await connectDB()

    console.log("DB Connected")

    const server = http.createServer(app)

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("SERVER ERROR:", error)
  }
}

startServer()

console.log("redeploy test")