import PageLayout
from "@/components/layout/PageLayout"

const members = [

  {
    name: "Alex Carter",
    role: "Frontend Engineer",
    online: true,
  },

  {
    name: "Sarah Kim",
    role: "UI Designer",
    online: true,
  },

  {
    name: "Mike Ross",
    role: "Backend Developer",
    online: false,
  },
]

export default function Members() {

  return (

    <PageLayout

      tag="TEAM"

      title="Workspace Members"

      description="
        Manage collaborators,
        monitor activity,
        and coordinate teams.
      "
    >

      <div className="
        grid
        md:grid-cols-3
        gap-6
      ">

        {members.map((member) => (

          <div
            key={member.name}

            className="
              cyber-card
              p-7
            "
          >

            <div className="
              flex items-center
              justify-between
              mb-6
            ">

              <div className="
                w-14 h-14

                bg-cyan-400/10

                flex items-center
                justify-center

                text-cyan-400

                font-black
                text-xl
              ">

                {
                  member.name.charAt(0)
                }

              </div>

              <div
                className={`
                  w-3 h-3

                  ${
                    member.online
                      ? "bg-green-400"
                      : "bg-red-400"
                  }
                `}
              />

            </div>

            <h2 className="
              text-2xl
              font-bold
              mb-2
            ">
              {member.name}
            </h2>

            <p className="
              text-slate-400
            ">
              {member.role}
            </p>

          </div>

        ))}

      </div>

    </PageLayout>
  )
}