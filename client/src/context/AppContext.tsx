import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const AppContext =
  createContext<any>(null)

const initialBoards = {

  todo: [],

  progress: [],

  completed: [],
}

export function AppProvider({
  children,
}: any) {

  const [currentWorkspace,
    setCurrentWorkspace] =
      useState(
        localStorage.getItem(
          "current-workspace"
        ) || "default"
      )

  const getBoardKey = () =>
    `kanban-${currentWorkspace}`

  const [boards, setBoards] =
    useState(() => {

      const saved =
        localStorage.getItem(
          `kanban-${
            localStorage.getItem(
              "current-workspace"
            ) || "default"
          }`
        )

      return saved

        ? JSON.parse(saved)

        : initialBoards
    })

  useEffect(() => {

    const saved =
      localStorage.getItem(
        getBoardKey()
      )

    if (saved) {

      setBoards(
        JSON.parse(saved)
      )

    } else {

      setBoards(
        initialBoards
      )
    }

  }, [currentWorkspace])

  useEffect(() => {

    localStorage.setItem(

      getBoardKey(),

      JSON.stringify(boards)
    )

  }, [
    boards,
    currentWorkspace,
  ])

  return (

    <AppContext.Provider
      value={{
        boards,
        setBoards,

        currentWorkspace,
        setCurrentWorkspace,
      }}
    >

      {children}

    </AppContext.Provider>
  )
}

export function useApp() {

  return useContext(
    AppContext
  )
}