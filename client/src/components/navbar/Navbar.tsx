import {
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
    h-[70px]
    md:h-[90px]

    border-b
    border-white/5

    px-4
    sm:px-6
    md:px-10

    flex
    items-center
    justify-end
  "
>

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

    </header>
  )
}