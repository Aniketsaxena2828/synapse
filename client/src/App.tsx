import { Routes, Route } from "react-router-dom"

import KanbanBoard from "./pages/kanban/KanbanBoard"

import DashboardLayout from "./layouts/DashboardLayout"

import Dashboard from "./pages/dashboard/Dashboard"

import Projects from "./pages/projects/Projects"

import ProjectDetails from "./pages/projects/ProjectDetails"

import Analytics from "./pages/analytics/Analytics"

import Members from "./pages/members/Members"


import Settings from "./pages/settings/Settings"

import Login from "./pages/auth/Login"

import Register from "./pages/auth/Register"

import ProtectedRoute from "./routes/ProtectedRoute"

export default function App() {

  return (

    <Routes>

      <Route
        path="/kanban"
        element={<KanbanBoard />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <DashboardLayout />

          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="projects"
          element={<Projects />}
        />

        <Route
          path="projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />

        <Route
          path="members"
          element={<Members />}
        />

        

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  )
}