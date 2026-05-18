import {
  useEffect,
  useState,
} from "react"

import {
  useParams,
} from "react-router-dom"

import {
  createTask,
  getTasks,
} from "@/services/taskService"

import { useAuthStore }
from "@/store/authStore"

import TaskCard
from "@/components/tasks/TaskCard"

interface Task {
  _id: string
  title: string
  description: string
  priority: string
  status: string
}

export default function ProjectDetails() {

  const { id } = useParams()

  const token = useAuthStore(
    (state) => state.token
  )

  const [tasks, setTasks] =
    useState<Task[]>([])

  const [title, setTitle] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [priority,
    setPriority] =
    useState("Medium")

  const fetchTasks = async () => {

    try {

      const data =
        await getTasks(
          id!,
          token!
        )

      setTasks(data)

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    if (token) {
      fetchTasks()
    }

  }, [token])

  const handleCreateTask =
    async () => {

      if (!title.trim()) return

      try {

        await createTask(
          {
            title,
            description,
            priority,
            projectId: id,
          },

          token!
        )

        setTitle("")
        setDescription("")

        fetchTasks()

      } catch (error) {

        console.log(error)

      }
    }

  return (
    <div>

      <div className="mb-10">

        <h1 className="
          text-4xl
          font-bold
        ">
          Project Tasks
        </h1>

        <p className="
          text-muted
          mt-2
        ">
          Manage tasks efficiently
        </p>

      </div>

      <div
        className="
        bg-card
        border border-border
        rounded-2xl
        p-6
        mb-8
      "
      >

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              bg-background
              border border-border
              rounded-xl
              p-4
              outline-none
            "
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              bg-background
              border border-border
              rounded-xl
              p-4
              h-[120px]
              outline-none
            "
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              bg-background
              border border-border
              rounded-xl
              p-4
              outline-none
            "
          >

            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

          </select>

          <button
            type="button"

            onClick={handleCreateTask}

            className="
              bg-primary
              p-4
              rounded-xl

              hover:scale-[1.02]
              active:scale-[0.98]

              transition-all
            "
          >
            Create Task
          </button>

        </div>

      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
      >

        {tasks.map((task) => (

          <TaskCard
            key={task._id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            status={task.status}
          />

        ))}

      </div>

    </div>
  )
}