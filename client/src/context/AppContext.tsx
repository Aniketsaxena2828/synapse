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
    useState<any>(defaultBoards)

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

  return useContext(
    AppContext
  )
}