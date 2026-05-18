import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import StatCard
from "@/components/dashboard/StatCard"

import {
  getDashboardData,
} from "@/services/dashboardService"

import {
  useAuthStore,
} from "@/store/authStore"

export default function Dashboard() {

  const token =
    useAuthStore(
      (state) => state.token
    )

  const [data, setData] =
    useState<any>(null)

  const fetchDashboard =
    async () => {

      try {

        const res =
          await getDashboardData(
            token!
          )

        setData(res)

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {
    fetchDashboard()
  }, [])

  if (!data) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  return (

    <div className="p-8">

      <div className="mb-10">

        <p className="
          text-cyan-400
          uppercase
          tracking-[0.25em]
          text-sm
          mb-3
        ">
          AI WORKSPACE
        </p>

        <h1 className="
          text-6xl
          font-black
          tracking-tight
          leading-none
          mb-4
        ">
          Command Center
        </h1>

        <p className="
          text-slate-400
          text-lg
          max-w-[700px]
        ">
          Monitor projects,
          track tasks,
          and manage your
          realtime workspace.
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        <StatCard
          title="TASKS DONE"
          value={
            data.completedTasks.toString()
          }
          change="+LIVE"
        />

        <StatCard
          title="IN PROGRESS"
          value={
            data.progressTasks.toString()
          }
          change="ACTIVE"
        />

        <StatCard
          title="OVERDUE"
          value={
            data.overdueTasks.toString()
          }
          change="TODO"
        />

        <StatCard
          title="PROJECTS"
          value={
            data.totalProjects.toString()
          }
          change="LIVE"
        />

      </div>

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        <div className="
          cyber-card
          p-7
          xl:col-span-2
        ">

          <div className="
            flex items-center
            justify-between
            mb-8
          ">

            <div>

              <p className="
                text-cyan-400
                text-sm
                uppercase
                tracking-widest
                mb-2
              ">
                Live Tasks
              </p>

              <h2 className="
                text-3xl
                font-black
              ">
                Mission Board
              </h2>

            </div>

          </div>

          <div className="
            grid
            md:grid-cols-2
            gap-5
          ">

            {data.recentTasks.map(
              (task: any) => (

                <div
                  key={task._id}

                  className="
                    border
                    border-cyan-400/10

                    bg-cyan-400/5

                    p-5
                  "
                >

                  <div className="
                    flex items-center
                    gap-3
                    mb-4
                  ">

                    <CheckCircle2
                      className="
                        text-cyan-400
                      "
                      size={20}
                    />

                    <p className="
                      uppercase
                      tracking-wide
                      text-sm
                      text-cyan-400
                    ">
                      {task.status}
                    </p>

                  </div>

                  <h3 className="
                    text-2xl
                    font-bold
                    mb-3
                  ">
                    {task.title}
                  </h3>

                  <p className="
                    text-slate-400
                  ">
                    {
                      task.description
                    }
                  </p>

                </div>

              )
            )}

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
            Workspace
          </p>

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">
            Team Status
          </h2>

          <div className="
            flex flex-col
            gap-5
          ">

            <div className="
              border
              border-white/5

              p-5
            ">

              <h2 className="
                text-xl
                font-bold
                mb-2
              ">
                Total Tasks
              </h2>

              <p className="
                text-slate-400
              ">
                {
                  data.totalTasks
                }
                {" "}
                tasks created
              </p>

            </div>

            <div className="
              border
              border-white/5

              p-5
            ">

              <h2 className="
                text-xl
                font-bold
                mb-2
              ">
                Active Projects
              </h2>

              <p className="
                text-slate-400
              ">
                {
                  data.totalProjects
                }
                {" "}
                active projects
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}