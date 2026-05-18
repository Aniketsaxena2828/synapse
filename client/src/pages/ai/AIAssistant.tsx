import PageLayout
from "@/components/layout/PageLayout"

export default function AIPage() {

  return (

    <PageLayout

      tag="AI"

      title="Neural Assistant"

      description="
        AI-powered productivity,
        planning, and workspace
        automation.
      "
    >

      <div className="
        cyber-card
        p-8
      ">

        <div className="
          flex flex-col
          gap-6
        ">

          <div className="
            bg-cyan-400/5

            border border-cyan-400/10

            p-5

            max-w-[70%]
          ">

            Generate roadmap
            for SaaS launch

          </div>

          <div className="
            bg-purple-400/5

            border border-purple-400/10

            p-5

            self-end

            max-w-[70%]
          ">

            Roadmap generated
            successfully with
            milestones and
            analytics strategy.

          </div>

        </div>

      </div>

    </PageLayout>
  )
}