import { createContext, useContext, useState } from 'react'

const AppContext = createContext<any>(null)

export function AppProvider({ children }: any) {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design dashboard',
      status: 'todo',
    },
  ])

  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'Synapse Workspace',
      status: 'Active',
    },
  ])

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
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