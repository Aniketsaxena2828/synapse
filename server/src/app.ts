import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import taskRoutes from "./routes/task.routes"
import dashboardRoutes from "./routes/dashboard.routes"
import authRoutes from "./routes/auth.routes"
import projectRoutes from "./routes/project.routes"
import workspaceRoutes from "./routes/workspace.routes"

const app = express()

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://anisynapse.netlify.app",
      "https://synapse-anii1ket.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// Handle preflight requests


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Test Route
app.get("/", (req, res) => {
  res.send("NEW BACKEND VERSION")
})

// Routes
app.use("/api/workspaces", workspaceRoutes)

app.use("/api/tasks", taskRoutes)

app.use("/api/dashboard", dashboardRoutes)

app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes)

export default app