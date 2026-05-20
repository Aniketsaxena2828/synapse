import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  KanbanSquare,
  PanelLeftClose,
} from "lucide-react"

import { NavLink }
from "react-router-dom"

import {
  useAuthStore,
} from "@/store/authStore"

const menuItems = [

  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    title: "Kanban",
    icon: KanbanSquare,
    path: "/kanban",
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

export default function Sidebar() {

  const {
    sidebarCollapsed,
    toggleSidebar,
  } = useAuthStore()

  return (

    <aside
      className={`
        ${sidebarCollapsed
          ? "w-[90px]"
          : "w-[290px]"
        }

        cyber-card

        border-r

        h-screen

        p-7

        hidden md:flex

        flex-col

        transition-all
        duration-300
      `}
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

          mb-8
        "
      >
        {!sidebarCollapsed
          ? "SYNAPSE"
          : "S"
        }
      </h1>

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

      <nav className="
        flex flex-col
        gap-4
      ">

        {menuItems.map((item) => {

          const Icon = item.icon

          return (

            <NavLink
              key={item.title}
              to={item.path}

              className={({ isActive }) => `

                flex items-center
                gap-4

                px-5 py-4

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

                      shadow-[0_0_25px_rgba(0,255,255,0.08)]
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

              {!sidebarCollapsed
                && item.title}

            </NavLink>

          )
        })}

      </nav>

    </aside>
  )
}