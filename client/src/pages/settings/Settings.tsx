import {
  useState,
} from "react"

import PageLayout
from "@/components/layout/PageLayout"

import {
  useAuthStore,
} from "@/store/authStore"

export default function Settings() {

  const {
    user,

    darkMode,

    notificationsEnabled,

    toggleDarkMode,

    toggleNotifications,

    updateUser,
  } = useAuthStore()

  const [name,
    setName] =
    useState(
      user?.name || ""
    )

  const handleSaveName =
    () => {

      updateUser({
        name,
      })

      alert(
        "Profile updated"
      )
    }

  return (

    <PageLayout

      tag="SETTINGS"

      title="Workspace Settings"

      description="
        Configure preferences,
        notifications,
        and account options.
      "
    >

      <div className="
        flex
        flex-col
        gap-6

        max-w-[700px]
      ">

        <div className="
          cyber-card
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-5
          ">
            Profile Settings
          </h2>

          <input
            type="text"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            placeholder="Your name"

            className="
              w-full
              bg-[#020817]
              border
              border-cyan-400/20
              p-4
              mb-4
              outline-none
            "
          />

          <button
            onClick={
              handleSaveName
            }

            className="
              cyber-button
              px-5
              py-3
              text-black
              font-bold
            "
          >
            Save Name
          </button>

        </div>

        <div className="
          cyber-card
          p-8
        ">

          <div className="
            flex items-center
            justify-between
            mb-6
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
                mb-2
              ">
                Email Notifications
              </h2>

              <p className="
                text-slate-400
              ">
                Receive workspace updates
              </p>

            </div>

            <button

              onClick={
                toggleNotifications
              }

              className="
                cyber-button
                px-5
                py-3
                text-black
                font-bold
              "
            >
              {
                notificationsEnabled

                  ? "Enabled"

                  : "Disabled"
              }
            </button>

          </div>

          <div className="
            flex items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
                mb-2
              ">
                Dark Mode
              </h2>

              <p className="
                text-slate-400
              ">
                Cyberpunk workspace theme
              </p>

            </div>

            <button

              onClick={
                toggleDarkMode
              }

              className="
                cyber-button
                px-5
                py-3
                text-black
                font-bold
              "
            >
              {
                darkMode

                  ? "Active"

                  : "Disabled"
              }
            </button>

          </div>

        </div>

      </div>

    </PageLayout>
  )
}