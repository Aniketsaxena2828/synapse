import PageLayout from "@/components/layout/PageLayout"
import { useApp } from "../../context/AppContext"

import {
  FolderKanban,
  Plus,
} from "lucide-react"

export default function Projects() {

  const { projects, setProjects } = useApp()

  function addProject() {

    const name = prompt("Enter project name")

    if (!name) return

    const newProject = {
      id: Date.now().toString(),
      title: name,
      description: "New workspace project",
      status: "Active",
    }

    setProjects((prev: any) => [
      ...prev,
      newProject,
    ])
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
            key={project.id}

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
                {project.status}
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

          </div>

        ))}

      </div>

    </PageLayout>
  )
}