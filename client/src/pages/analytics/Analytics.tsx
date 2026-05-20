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
  w-[420px]
  h-[420px]

  flex
  items-center
  justify-center
">

  <div
    className="
      absolute
      inset-0
      rounded-full

      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
    "
    style={{
      background: `conic-gradient(

        #38bdf8 0deg
        ${todoPercent * 3.6}deg,

        #818cf8
        ${todoPercent * 3.6}deg
        ${(todoPercent + progressPercent) * 3.6}deg,

        #22c55e
        ${(todoPercent + progressPercent) * 3.6}deg
        360deg
      )`,
    }}
  />

  <div className="
    absolute
    w-[230px]
    h-[230px]

    rounded-full

    bg-white

    flex
    flex-col
    items-center
    justify-center

    shadow-inner
    border
    border-slate-200
  ">

    <h2 className="
      text-7xl
      font-black
      text-slate-900
    ">
      {completedPercent}%
    </h2>

    <p className="
      text-slate-500
      text-xl
      mt-2
    ">
      Completed
    </p>

  </div>

  <div className="
    absolute
    top-[10%]
    right-[-140px]

    flex
    flex-col
    gap-2
  ">

    <div className="
      flex
      items-center
      gap-3
    ">

      <div className="
        w-4
        h-4
        rounded-full
        bg-sky-400
      " />

      <span className="
        font-semibold
      ">
        Todo
      </span>

    </div>

    <p className="
      text-slate-500
      text-sm
    ">
      {todo} tasks
    </p>

  </div>

  <div className="
    absolute
    bottom-[18%]
    right-[-150px]

    flex
    flex-col
    gap-2
  ">

    <div className="
      flex
      items-center
      gap-3
    ">

      <div className="
        w-4
        h-4
        rounded-full
        bg-indigo-400
      " />

      <span className="
        font-semibold
      ">
        In Progress
      </span>

    </div>

    <p className="
      text-slate-500
      text-sm
    ">
      {progress} tasks
    </p>

  </div>

  <div className="
    absolute
    left-[-130px]
    top-[35%]

    flex
    flex-col
    gap-2
    items-end
  ">

    <div className="
      flex
      items-center
      gap-3
    ">

      <div className="
        w-4
        h-4
        rounded-full
        bg-green-500
      " />

      <span className="
        font-semibold
      ">
        Completed
      </span>

    </div>

    <p className="
      text-slate-500
      text-sm
    ">
      {completed} tasks
    </p>

  </div>

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
  p-6
  rounded-xl
  w-full
">

  <h3 className="
    text-2xl
    font-black
    mb-5
  ">
    Workspace Insights
  </h3>

  <div className="
    flex
    flex-col
    gap-5
    text-slate-300
    leading-relaxed
  ">

    <p>
      🔴
      {" "}
      <span className="
        text-red-400
        font-bold
      ">
        {todoPercent}%
      </span>
      {" "}
      of total tasks are currently
      pending in the Todo stage.
    </p>

    <p>
      🟡
      {" "}
      <span className="
        text-yellow-300
        font-bold
      ">
        {progressPercent}%
      </span>
      {" "}
      of tasks are actively being
      developed in the workflow.
    </p>

    <p>
      🌸
      {" "}
      <span className="
        text-pink-400
        font-bold
      ">
        {completedPercent}%
      </span>
      {" "}
      of all tasks have been
      successfully completed.
    </p>

    <p>
      The realtime analytics engine
      continuously monitors Kanban
      activity and dynamically updates
      task distribution insights.
    </p>

  </div>

</div>

</div>

</div>

</PageLayout>
)
}