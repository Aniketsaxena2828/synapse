import PageLayout
from "@/components/layout/PageLayout"

export default function Settings() {

  return (

    <PageLayout

      tag="SETTINGS"

      title="Workspace Settings"

      description="
        Configure preferences,
        notifications,
        and account options.
      "
    >

      <div className="
        cyber-card
        p-8
        max-w-[700px]
      ">

        <div className="
          flex items-center
          justify-between
          mb-6
        ">

          <div>

            <h2 className="
              text-2xl
              font-bold
              mb-2
            ">
              Email Notifications
            </h2>

            <p className="
              text-slate-400
            ">
              Receive workspace updates
            </p>

          </div>

          <button
            className="
              cyber-button

              px-5 py-3

              text-black
              font-bold
            "
          >
            Enabled
          </button>

        </div>

        <div className="
          flex items-center
          justify-between
        ">

          <div>

            <h2 className="
              text-2xl
              font-bold
              mb-2
            ">
              Dark Mode
            </h2>

            <p className="
              text-slate-400
            ">
              Cyberpunk workspace theme
            </p>

          </div>

          <button
            className="
              cyber-button

              px-5 py-3

              text-black
              font-bold
            "
          >
            Active
          </button>

        </div>

      </div>

    </PageLayout>
  )
}