import PageLayout from "@/components/layout/PageLayout"

import {
  FolderKanban,
  Plus,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import {
  createProject,
  getProjects,
} from "@/services/projectService"

import {
  useAuthStore,
} from "@/store/authStore"

export default function Projects() {

  const token = useAuthStore(
    (state) => state.token
  )

  const [projects, setProjects] =
    useState<any[]>([])

  const fetchProjects = async () => {

    try {

      const data =
        await getProjects(token!)

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

  async function addProject() {

    const title =
      prompt("Enter project name")

    if (!title?.trim()) return

    try {

      await createProject(
        {
          title,
          description:
            "New workspace project",
        },

        token!
      )

      fetchProjects()

    } catch (error) {

      console.log(error)
    }
  }

  function deleteProject(id: string) {

    setProjects((prev: any) =>
      prev.filter(
        (project: any) =>
          project._id !== id
      )
    )
  }

  return (

    <PageLayout

      tag="PROJECTS"

      title="Project Control"

      description="
        Organize, monitor,
        and manage all active
        workspace projects.
      "
    >

      <div className="
        flex items-center
        justify-between
        mb-8
      ">

        <div />

        <button
          onClick={addProject}

          className="
            cyber-button

            px-6 py-4

            text-black
            font-black

            flex items-center
            gap-3
          "
        >

          <Plus size={18} />

          NEW PROJECT

        </button>

      </div>

      <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {projects.map((project: any) => (

          <div
            key={project._id}

            className="
              cyber-card

              p-7

              relative

              overflow-hidden
            "
          >

            <div
              className="
                absolute

                top-0
                right-0

                w-28
                h-28

                bg-cyan-400/10

                blur-3xl
              "
            />

            <div className="
              flex items-center
              justify-between
              mb-8
            ">

              <div className="
                w-14 h-14

                bg-cyan-400/10

                border border-cyan-400/20

                flex items-center
                justify-center
              ">

                <FolderKanban
                  className="
                    text-cyan-400
                  "
                  size={22}
                />

              </div>

              <span className="
                px-4 py-2

                text-xs

                uppercase

                tracking-widest

                border

                border-cyan-400/20

                text-cyan-400

                bg-cyan-400/5
              ">
                {project.status || "ACTIVE"}
              </span>

            </div>

            <h2 className="
              text-3xl
              font-black
              mb-4
            ">
              {project.title}
            </h2>

            <p className="
              text-slate-400

              leading-relaxed
            ">
              {project.description}
            </p>

            <button
              onClick={() =>
                deleteProject(project._id)
              }

              className="
                mt-5

                border border-red-500/30

                text-red-400

                px-4 py-2

                text-sm

                hover:bg-red-500/10

                transition-all
              "
            >
              DELETE PROJECT
            </button>

          </div>

        ))}

      </div>

    </PageLayout>
  )
}