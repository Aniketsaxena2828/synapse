import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext = createContext<any>(null)

export function AppProvider({ children }: any) {

  const [projects, setProjects] = useState(() => {

    const saved = localStorage.getItem("projects")

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            title: "Synapse Workspace",
            description: "AI-powered productivity platform",
            status: "Active",
          },

          {
            id: "2",
            title: "Realtime Engine",
            description: "Socket.io collaboration system",
            status: "Development",
          },
        ]
  })

  useEffect(() => {

    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    )

  }, [projects])

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}