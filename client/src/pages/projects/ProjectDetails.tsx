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

  const { id } =
    useParams()

  const token =
    useAuthStore(
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

  const fetchTasks =
    async () => {

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

    if (token && id) {

      fetchTasks()
    }

  }, [token, id])

  const handleCreateTask =
    async () => {

      if (!title.trim())
        return

      try {

        await createTask(

          {
            title,

            description,

            priority,

            workspaceId: id,
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

    <div className="
      min-h-screen

      px-8
      py-10
    ">

      <div className="mb-10">

        <p className="
          text-cyan-400

          tracking-[6px]

          text-sm

          mb-3
        ">
          WORKSPACE TASKS
        </p>

        <h1 className="
          text-6xl

          font-black

          tracking-tight

          mb-4
        ">
          Project Tasks
        </h1>

        <p className="
          text-slate-400

          text-xl
        ">
          Manage tasks efficiently
          and collaborate seamlessly.
        </p>

      </div>

      <div
        className="
          cyber-card

          rounded-3xl

          p-7

          mb-10
        "
      >

        <div className="
          grid
          gap-5
        ">

          <input
            type="text"

            placeholder="Task title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="
              cyber-input

              rounded-2xl

              p-5
            "
          />

          <textarea

            placeholder="
              Task description
            "

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            className="
              cyber-input

              rounded-2xl

              p-5

              h-[140px]
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
              cyber-input

              rounded-2xl

              p-5
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

            onClick={
              handleCreateTask
            }

            className="
              cyber-button

              rounded-2xl

              p-5

              text-black

              font-bold

              text-lg

              hover:scale-[1.01]

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

          gap-7
        "
      >

        {tasks.map((task) => (

          <TaskCard

            key={task._id}

            title={task.title}

            description={
              task.description
            }

            priority={
              task.priority
            }

            status={
              task.status
            }
          />

        ))}

      </div>

    </div>
  )
}