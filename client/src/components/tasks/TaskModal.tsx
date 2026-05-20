import { useEffect, useState } from "react"
import axios from "axios"
import socket from "@/lib/socket"

import TaskModal from "@/components/tasks/TaskModal"

interface Task {
  _id: string
  title: string
  description?: string
  status: string
}

interface Props {

  task: any

  projectId: string

  onClose: () => void

  refresh: () => Promise<void>
}

const columns = [
  "Todo",
  "In Progress",
  "Done"
]

export default function KanbanBoard({
  projectId,
}: Props) {

  const [tasks, setTasks] =
    useState<Task[]>([])

  const [selectedTask,
    setSelectedTask] =
    useState<any>(null)

  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`
      )

      setTasks(res.data)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {

    fetchTasks()

    socket.emit("joinProject", projectId)

    socket.on(
      "taskCreated",
      () => {
        fetchTasks()
      }
    )

    socket.on(
      "taskUpdated",
      () => {
        fetchTasks()
      }
    )

    socket.on(
      "taskDeleted",
      () => {
        fetchTasks()
      }
    )

    return () => {

      socket.off("taskCreated")

      socket.off("taskUpdated")

      socket.off("taskDeleted")

    }

  }, [projectId])

  return (

    <div className="grid grid-cols-3 gap-4">

      {columns.map((column) => (

        <div
          key={column}
          className="bg-zinc-900 rounded-xl p-4"
        >

          <h2 className="text-lg font-bold mb-4">
            {column}
          </h2>

          <div className="space-y-3">

            {tasks
              .filter(
                (task) =>
                  task.status === column
              )
              .map((task) => (

                <div
                  key={task._id}
                  onClick={() =>
                    setSelectedTask(task)
                  }
                  className="bg-zinc-800 p-4 rounded-lg cursor-pointer hover:bg-zinc-700 transition"
                >

                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mt-1">
                    {task.description}
                  </p>

                </div>

              ))}

          </div>

        </div>

      ))}

      {
        selectedTask && (

          <TaskModal
            task={selectedTask}
            onClose={() =>
              setSelectedTask(null)
            }
            refresh={fetchTasks}
          />

        )
      }

    </div>
  )
}