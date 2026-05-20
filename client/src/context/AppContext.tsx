import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext =
  createContext<any>(null)

const initialBoards = {
  todo: [
    {
      id: "1",
      title: "Design dashboard",
    },
  ],

  progress: [],

  completed: [],
}

export function AppProvider({
  children,
}: any) {

  const [boards, setBoards] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "kanban-data"
        )

      return saved
        ? JSON.parse(saved)
        : initialBoards
    })

  useEffect(() => {

    localStorage.setItem(
      "kanban-data",
      JSON.stringify(boards)
    )

  }, [boards])

  return (

    <AppContext.Provider
      value={{
        boards,
        setBoards,
      }}
    >

      {children}

    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}