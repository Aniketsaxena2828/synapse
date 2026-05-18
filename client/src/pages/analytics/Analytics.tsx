import PageLayout
from "@/components/layout/PageLayout"

export default function Analytics() {

  return (

    <PageLayout

      tag="ANALYTICS"

      title="Performance Analytics"

      description="
        Monitor productivity,
        project health, and
        workspace efficiency.
      "
    >

      <div className="
        grid
        md:grid-cols-3
        gap-6
      ">

        <div className="
          cyber-card
          p-7
        ">

          <h2 className="
            text-slate-400
            mb-3
          ">
            Completion Rate
          </h2>

          <h1 className="
            text-5xl
            font-black
            text-cyan-400
          ">
            87%
          </h1>

        </div>

        <div className="
          cyber-card
          p-7
        ">

          <h2 className="
            text-slate-400
            mb-3
          ">
            Active Projects
          </h2>

          <h1 className="
            text-5xl
            font-black
            text-purple-400
          ">
            8
          </h1>

        </div>

        <div className="
          cyber-card
          p-7
        ">

          <h2 className="
            text-slate-400
            mb-3
          ">
            Tasks Completed
          </h2>

          <h1 className="
            text-5xl
            font-black
            text-cyan-400
          ">
            47
          </h1>

        </div>

      </div>

    </PageLayout>
  )
}