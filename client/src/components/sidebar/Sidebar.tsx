import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  KanbanSquare,
  PanelLeftClose,
  Menu,
  X,
} from "lucide-react"

import {
  Link,
  NavLink,
} from "react-router-dom"

import {
  useAuthStore,
} from "@/store/authStore"

import { useState } from "react"

export default function Sidebar() {

  const {
    sidebarCollapsed,
    toggleSidebar,
  } = useAuthStore()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const currentWorkspace =
    localStorage.getItem(
      "current-workspace"
    ) || "default"

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Kanban",
      icon: KanbanSquare,
      path: `/kanban/${currentWorkspace}`,
    },
    {
      title: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Members",
      icon: Users,
      path: "/members",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ]

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          md:hidden
          fixed
          top-5
          left-4
          z-[100]

          p-2

          cyber-card

          text-cyan-400
        "
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="
            md:hidden
            fixed
            inset-0
            bg-black/60
            z-[90]
          "
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          md:hidden

          fixed
          top-0
          left-0

          h-screen
          w-[290px]

          cyber-card
          border-r

          p-7

          z-[95]

          transition-transform
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <button
          onClick={() =>
            setMobileOpen(false)
          }
          className="
            absolute
            top-5
            right-5
            text-cyan-400
          "
        >
          <X size={24} />
        </button>

        <Link
          to="/"
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <h1
            className="
              text-5xl
              font-black
              tracking-tight

              bg-gradient-to-r
              from-cyan-400
              to-purple-500

              bg-clip-text
              text-transparent

              mb-10
            "
          >
            SYNAPSE
          </h1>
        </Link>

        <nav
          className="
            flex
            flex-col
            gap-4
          "
        >
          {menuItems.map((item) => {

            const Icon =
              item.icon

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-4

                  px-5
                  py-4

                  border

                  uppercase
                  tracking-wide

                  text-[14px]
                  font-semibold

                  ${
                    isActive
                      ? `
                        border-cyan-400/30
                        bg-cyan-400/10
                        text-cyan-300
                      `
                      : `
                        border-white/5
                        text-slate-400
                      `
                  }
                `}
              >
                <Icon size={19} />
                {item.title}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          ${
            sidebarCollapsed
              ? "w-[90px]"
              : "w-[290px]"
          }

          cyber-card
          border-r
          h-screen
          p-7

          hidden
          md:flex

          flex-col

          transition-all
          duration-300
        `}
      >
        <Link to="/">
          <h1
            className="
              text-5xl
              font-black
              tracking-tight

              bg-gradient-to-r
              from-cyan-400
              to-purple-500

              bg-clip-text
              text-transparent

              mb-8
              cursor-pointer
            "
          >
            {!sidebarCollapsed
              ? "SYNAPSE"
              : "S"}
          </h1>
        </Link>

        <button
          onClick={
            toggleSidebar
          }
          className="
            mb-8
            text-cyan-400
            hover:text-white
            transition-all
          "
        >
          <PanelLeftClose />
        </button>

        <nav
          className="
            flex
            flex-col
            gap-4
          "
        >
          {menuItems.map((item) => {

            const Icon =
              item.icon

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) => `
                  flex
                  items-center

                  gap-4

                  px-5
                  py-4

                  border

                  transition-all
                  duration-300

                  uppercase
                  tracking-wide

                  text-[14px]
                  font-semibold

                  ${
                    isActive
                      ? `
                        border-cyan-400/30
                        bg-cyan-400/10
                        text-cyan-300
                      `
                      : `
                        border-white/5
                        text-slate-400
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/5
                        hover:text-white
                      `
                  }
                `}
              >
                <Icon size={19} />

                {!sidebarCollapsed &&
                  item.title}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}