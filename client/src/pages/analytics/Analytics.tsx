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

import {
  useApp,
} from "../../context/AppContext"

export default function Analytics() {

  const token =
    useAuthStore(
      (state) => state.token
    )

  const {
    boards,
  } = useApp()

  const [projects,
    setProjects] =
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

  useEffect(() => {

    if (token) {

      fetchProjects()
    }

  }, [token])

  const todo =
    boards.todo.length

  const progress =
    boards.progress.length

  const completed =
    boards.completed.length

  const total =
    todo +
    progress +
    completed

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

          </div>

        </div>

      </div>

    </PageLayout>
  )
}