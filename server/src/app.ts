import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dashboardRoutes from "./routes/dashboard.routes"
import authRoutes from "./routes/auth.routes"
import projectRoutes from "./routes/project.routes"
import taskRoutes from "./routes/task.routes"
import workspaceRoutes from "./routes/workspace.routes"
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(
  "/api/workspaces",
  workspaceRoutes
)
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Synapse Backend Running")
})
app.use(
  "/api/dashboard",
  dashboardRoutes
)
app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes)

app.use("/api/tasks", taskRoutes)

export default app