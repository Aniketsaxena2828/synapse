import {
  createContext,
  useContext,
  useState,
} from "react"

const AppContext =
  createContext<any>(null)

const defaultBoards = {

  todo: [],

  progress: [],

  completed: [],
}

export function AppProvider({
  children,
}: any) {

  const [boards, setBoards] =
    useState<any>(null)

  return (

    <AppContext.Provider
      value={{
        boards:
          boards ||
          defaultBoards,

        setBoards,
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