import {
  Bell,
  Search,
  LogOut,
} from "lucide-react"

import { useState }
from "react"

import { useAuthStore }
from "@/store/authStore"

export default function Navbar() {

  const [open, setOpen] =
    useState(false)

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
        h-[90px]

        border-b
        border-white/5

        px-10

        flex items-center
        justify-between
      "
    >

      <div
        className="
          cyber-card

          w-[430px]

          px-5 py-4

          flex items-center
          gap-4

          border
        "
      >

        <Search
          className="
            text-cyan-400
          "
          size={18}
        />

        <input
          type="text"

          placeholder="
            Search tasks, projects...
          "

          className="
            cyber-input

            bg-transparent

            border-none

            w-full
          "
        />

      </div>

      <div
        className="
          flex items-center
          gap-5
        "
      >

        <button
          className="
            cyber-card

            p-4

            border

            relative
          "
        >

          <Bell size={20} />

          <span
            className="
              absolute

              top-2
              right-2

              w-2
              h-2

              bg-cyan-400
            "
          />

        </button>

        <div className="relative">

          <button

            onClick={() =>
              setOpen(!open)
            }

            className="
              cyber-button

              w-12 h-12

              text-black

              font-black

              flex items-center
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

                  px-5 py-4

                  flex items-center
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

    </header>
  )
}