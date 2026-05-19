import PageLayout
from "@/components/layout/PageLayout"

import {
  useEffect,
  useState,
} from "react"

import {
  getProjects,
} from "@/services/projectService"

import {
  useAuthStore,
} from "@/store/authStore"

export default function Analytics() {

  const token =
    useAuthStore(
      (state) => state.token
    )

  const [projects,
    setProjects] =
    useState<any[]>([])

  const [tasks,
    setTasks] =
    useState<any[]>([])

  const fetchProjects =
    async () => {

      try {

        const data =
          await getProjects(
            token!
          )

        setProjects(data)

      } catch (error) {

        console.log(error)
      }
    }

  const fetchTasks =
    async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/tasks",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        const data =
          await response.json()

        setTasks(data)

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    if (token) {

      fetchProjects()

      fetchTasks()
    }

  }, [token])

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length

  const progress =
    tasks.filter(
      (task) =>
        task.status ===
        "in-progress"
    ).length

  const todo =
    tasks.filter(
      (task) =>
        task.status ===
        "todo"
    ).length

  const total =
    completed +
    progress +
    todo

  const completedPercent =
    total
      ? Math.round(
          (completed / total) * 100
        )
      : 0

  const progressPercent =
    total
      ? Math.round(
          (progress / total) * 100
        )
      : 0

  const todoPercent =
    total
      ? Math.round(
          (todo / total) * 100
        )
      : 0

  return (

    <PageLayout

      tag="ANALYTICS"

      title="Performance Analytics"

      description="
        Monitor productivity,
        project health,
        and workspace efficiency.
      "
    >

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-10
      ">

        <div className="
          cyber-card
          p-8
        ">

          <p className="
            text-slate-400
            mb-4
          ">
            Active Projects
          </p>

          <h2 className="
            text-6xl
            font-black
            text-cyan-400
          ">
            {projects.length}
          </h2>

        </div>

        <div className="
          cyber-card
          p-8
        ">

          <p className="
            text-slate-400
            mb-4
          ">
            Tasks Completed
          </p>

          <h2 className="
            text-6xl
            font-black
            text-pink-400
          ">
            {completed}
          </h2>

        </div>

        <div className="
          cyber-card
          p-8
        ">

          <p className="
            text-slate-400
            mb-4
          ">
            Productivity
          </p>

          <h2 className="
            text-6xl
            font-black
            text-purple-400
          ">
            {completedPercent}%
          </h2>

        </div>

      </div>

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        <div className="
          cyber-card
          p-7
        ">

          <p className="
            text-cyan-400
            uppercase
            tracking-widest
            text-sm
            mb-3
          ">
            Insights
          </p>

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">
            Recent Projects
          </h2>

          <div className="
            flex
            flex-col
            gap-5
          ">

            {projects
              .slice(-2)
              .reverse()
              .map((project) => (

                <div
                  key={project._id}

                  className="
                    border
                    border-cyan-400/10
                    p-5
                  "
                >

                  <h3 className="
                    text-2xl
                    font-bold
                    mb-2
                  ">
                    {project.title}
                  </h3>

                  <p className="
                    text-slate-400
                  ">
                    {
                      project.description
                    }
                  </p>

                </div>

              ))}

          </div>

        </div>

        <div className="
          cyber-card
          p-7
        ">

          <p className="
            text-cyan-400
            uppercase
            tracking-widest
            text-sm
            mb-3
          ">
            Task Distribution
          </p>

          <h2 className="
            text-3xl
            font-black
            mb-10
          ">
            Kanban Overview
          </h2>

          <div className="
            flex
            flex-col
            items-center
          ">

            <div className="
              relative
              w-[260px]
              h-[260px]
              rounded-full
            ">

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                "
                style={{
                  background:
                    `conic-gradient(
                      #ef4444 0% ${todoPercent}%,
                      #facc15 ${todoPercent}% ${todoPercent + progressPercent}%,
                      #ec4899 ${todoPercent + progressPercent}% 100%
                    )`,
                }}
              />

              <div className="
                absolute
                inset-[45px]
                bg-[#020817]
                rounded-full

                flex
                items-center
                justify-center
                flex-col
              ">

                <h2 className="
                  text-5xl
                  font-black
                ">
                  {completedPercent}%
                </h2>

                <p className="
                  text-slate-400
                  text-sm
                  mt-2
                ">
                  Completed
                </p>

              </div>

            </div>

            <div className="
              flex
              gap-8
              mt-10
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-4
                  h-4
                  bg-red-500
                " />

                <span>
                  Todo
                </span>

              </div>

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-4
                  h-4
                  bg-yellow-400
                " />

                <span>
                  In Progress
                </span>

              </div>

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-4
                  h-4
                  bg-pink-500
                " />

                <span>
                  Completed
                </span>

              </div>

            </div>

            <div className="
              mt-10
              border
              border-cyan-400/10
              p-5
              w-full
            ">

              <h3 className="
                text-2xl
                font-bold
                mb-4
              ">
                Realtime Analysis
              </h3>

              <div className="
                flex
                flex-col
                gap-4
                text-slate-300
              ">

                <p>
                  🔴 Todo Tasks:
                  {" "}
                  <span className="
                    text-red-400
                    font-bold
                  ">
                    {todo}
                  </span>
                  {" "}
                  tasks are waiting
                  to be started.
                </p>

                <p>
                  🟡 In Progress:
                  {" "}
                  <span className="
                    text-yellow-300
                    font-bold
                  ">
                    {progress}
                  </span>
                  {" "}
                  tasks are actively
                  being worked on.
                </p>

                <p>
                  🌸 Completed:
                  {" "}
                  <span className="
                    text-pink-400
                    font-bold
                  ">
                    {completed}
                  </span>
                  {" "}
                  tasks have been
                  successfully finished.
                </p>

                <p>
                  Current workspace
                  productivity is
                  approximately
                  {" "}
                  <span className="
                    text-cyan-400
                    font-bold
                  ">
                    {completedPercent}%
                  </span>
                  {" "}
                  based on completed
                  task distribution.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </PageLayout>
  )
}