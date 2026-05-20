import { create } from "zustand"

import { persist }
from "zustand/middleware"

interface User {

  id: string

  name: string

  email: string

  avatar?: string
}

interface AuthStore {

  user: User | null

  token: string | null

  darkMode: boolean

  sidebarCollapsed: boolean

  notificationsEnabled: boolean

  login: (
    user: User,
    token: string
  ) => void

  logout: () => void

  updateUser: (
    data: Partial<User>
  ) => void

  toggleDarkMode: () => void

  toggleSidebar: () => void

  toggleNotifications: () => void
}

export const useAuthStore =
  create<AuthStore>()(

    persist(

      (set) => ({

        user: null,

        token: null,

        darkMode: true,

        sidebarCollapsed: false,

        notificationsEnabled: true,

        login: (
          user,
          token
        ) => {

          set({
            user,
            token,
          })
        },

        logout: () => {

          set({
            user: null,
            token: null,
          })
        },

        updateUser: (
          data
        ) => {

          set((state) => ({

            user:
              state.user
                ? {
                    ...state.user,
                    ...data,
                  }
                : null,
          }))
        },

        toggleDarkMode: () => {

          set((state) => ({

            darkMode:
              !state.darkMode,
          }))
        },

        toggleSidebar: () => {

          set((state) => ({

            sidebarCollapsed:
              !state.sidebarCollapsed,
          }))
        },

        toggleNotifications:
          () => {

            set((state) => ({

              notificationsEnabled:
                !state.notificationsEnabled,
            }))
          },
      }),

      {
        name:
          "auth-storage",
      }
    )
  )