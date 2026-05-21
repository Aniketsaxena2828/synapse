import {
  LogOut,
  Menu,
} from "lucide-react"

import { useState }
from "react"

import { useAuthStore }
from "@/store/authStore"

export default function Navbar() {

  const [open, setOpen] =
    useState(false)

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false)

  const logout =
    useAuthStore(
      (state) => state.logout
    )

  const user =
    useAuthStore(
      (state) => state.user
    )

  return (

    <header
      className="
        relative

        h-[70px]
        md:h-[90px]

        border-b
        border-white/5

        px-4
        sm:px-6
        md:px-10

        flex
        items-center
        justify-between
      "
    >

      <button
  onClick={() =>
    setMobileMenuOpen(!mobileMenuOpen)
  }
  className="
    md:hidden

    fixed
    top-4
    left-4

    z-[9999]

    bg-cyan-500
    text-black

    p-3
    rounded-lg
  "
>
  <Menu size={28} />
</button>

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        <div className="relative">

          <button

            onClick={() =>
              setOpen(!open)
            }

            className="
              cyber-button

              w-10
              h-10

              md:w-12
              md:h-12

              text-black

              font-black

              flex
              items-center
              justify-center
            "
          >

            {
              user?.name
                ?.charAt(0)
                ?.toUpperCase()
            }

          </button>

          {open && (

            <div
              className="
                absolute
                right-0
                mt-4

                w-[220px]

                cyber-card

                border

                z-50
              "
            >

              <button

                onClick={logout}

                className="
                  w-full

                  px-5
                  py-4

                  flex
                  items-center
                  gap-3

                  text-slate-300

                  hover:bg-cyan-400/5

                  transition-all
                "
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

      {mobileMenuOpen && (

        <div
          className="
            absolute

            top-full
            left-0

            w-full

            cyber-card

            border-t
            border-cyan-400/20

            z-50

            md:hidden
          "
        >

          <nav
            className="
              flex
              flex-col
            "
          >

            <a
              href="/"
              className="
                p-4
                border-b
                border-white/5
              "
            >
              Dashboard
            </a>

            <a
              href="/kanban"
              className="
                p-4
                border-b
                border-white/5
              "
            >
              Kanban
            </a>

            <a
              href="/projects"
              className="
                p-4
                border-b
                border-white/5
              "
            >
              Projects
            </a>

            <a
              href="/analytics"
              className="
                p-4
                border-b
                border-white/5
              "
            >
              Analytics
            </a>

            <a
              href="/members"
              className="
                p-4
                border-b
                border-white/5
              "
            >
              Members
            </a>

            <a
              href="/settings"
              className="
                p-4
              "
            >
              Settings
            </a>

          </nav>

        </div>

      )}

    </header>
  )
}