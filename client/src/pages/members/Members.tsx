import {
  useEffect,
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import PageLayout
from "@/components/layout/PageLayout"

import {
  useAuthStore,
} from "@/store/authStore"

import {
  createWorkspace,
  getWorkspaces,
  joinWorkspace,
  deleteWorkspace,
  removeMember,
  leaveWorkspace,
} from "@/services/workspaceService"

export default function Members() {

  const navigate =
    useNavigate()

  const token =
    useAuthStore(
      (state) => state.token
    )

  const user =
    useAuthStore(
      (state) => state.user
    )

  const [myWorkspaces,
    setMyWorkspaces] =
    useState<any[]>([])

  const [publicWorkspaces,
    setPublicWorkspaces] =
    useState<any[]>([])

  const [workspaceName,
    setWorkspaceName] =
    useState("")

  const [joinCode,
    setJoinCode] =
    useState("")

  const [isPrivate,
    setIsPrivate] =
    useState(false)

  const fetchWorkspaces =
    async () => {

      try {

        const data =
          await getWorkspaces(
            token!
          )

        setMyWorkspaces(
          data.myWorkspaces
        )

        setPublicWorkspaces(
          data.publicWorkspaces
        )

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    if (token) {

      fetchWorkspaces()
    }

  }, [token])

  const handleCreateWorkspace =
    async () => {

      if (
        !workspaceName.trim()
      ) return

      try {

        await createWorkspace(
          {
            name:
              workspaceName,

            isPrivate,
          },

          token!
        )

        setWorkspaceName("")

        fetchWorkspaces()

      } catch (error) {

        console.log(error)
      }
    }

  const handleJoinWorkspace =
    async () => {

      if (!joinCode.trim())
        return

      try {

        await joinWorkspace(
          joinCode,
          token!
        )

        setJoinCode("")

        fetchWorkspaces()

      } catch (error) {

        console.log(error)
      }
    }

  const handleDeleteWorkspace =
    async (id: string) => {

      try {

        await deleteWorkspace(
          id,
          token!
        )

        fetchWorkspaces()

      } catch (error) {

        console.log(error)
      }
    }

  const handleRemoveMember =
    async (
      workspaceId: string,
      memberId: string
    ) => {

      try {

        await removeMember(
          workspaceId,
          memberId,
          token!
        )

        fetchWorkspaces()

      } catch (error) {

        console.log(error)
      }
    }

  const handleLeaveWorkspace =
    async (workspaceId: string) => {

      try {

        await leaveWorkspace(
          workspaceId,
          token!
        )

        fetchWorkspaces()

      } catch (error) {

        console.log(error)
      }
    }

  const openWorkspace =
  (workspace: any) => {

    localStorage.setItem(

      "current-workspace",

      workspace._id
    )
    navigate(
      `/kanban/${workspace._id}`
    )
  }

  return (

    <PageLayout

      tag="MEMBERS"

      title="Workspace Members"

      description="
        Manage collaboration,
        connect teams,
        and join shared workspaces.
      "
    >

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mb-10
      ">

        <div className="
          cyber-card
          p-7
        ">

          <h2 className="
            text-3xl
            font-black
            mb-6
          ">
            Create Workspace
          </h2>

          <div className="
            flex
            flex-col
            gap-4
          ">

            <input
              type="text"
              placeholder="Workspace name"

              value={workspaceName}

              onChange={(e) =>
                setWorkspaceName(
                  e.target.value
                )
              }

              className="
                bg-[#020817]
                border
                border-cyan-400/20
                p-4
                outline-none
              "
            />

            <label className="
              flex
              items-center
              gap-3
              text-slate-300
            ">

              <input
                type="checkbox"

                checked={
                  isPrivate
                }

                onChange={(e) =>
                  setIsPrivate(
                    e.target.checked
                  )
                }
              />

              Private Workspace

            </label>

            <button
              onClick={
                handleCreateWorkspace
              }

              className="
                bg-cyan-400
                text-black
                font-bold
                py-4
              "
            >
              Create Workspace
            </button>

          </div>

        </div>

        <div className="
          cyber-card
          p-7
        ">

          <h2 className="
            text-3xl
            font-black
            mb-6
          ">
            Join Workspace
          </h2>

          <div className="
            flex
            flex-col
            gap-4
          ">

            <input
              type="text"

              placeholder="Invite code"

              value={joinCode}

              onChange={(e) =>
                setJoinCode(
                  e.target.value
                )
              }

              className="
                bg-[#020817]
                border
                border-cyan-400/20
                p-4
                outline-none
              "
            />

            <button
              onClick={
                handleJoinWorkspace
              }

              className="
                bg-purple-500
                text-white
                font-bold
                py-4
              "
            >
              Join Workspace
            </button>

          </div>

        </div>

      </div>

      <div className="
        cyber-card
        p-7
        mb-10
      ">

        <h2 className="
          text-3xl
          font-black
          mb-8
        ">
          My Workspaces
        </h2>

        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">

          {myWorkspaces.map(
            (workspace) => (

              <div
                key={workspace._id}

                className="
                  border
                  border-cyan-400/10
                  p-6
                "
              >

                <h3 className="
                  text-2xl
                  font-bold
                  mb-4
                ">
                  {workspace.name}
                </h3>

                <p className="
                  text-slate-400
                  mb-3
                ">
                  Invite Code:
                  {" "}
                  <span className="
                    text-cyan-400
                    font-bold
                  ">
                    {
                      workspace.inviteCode
                    }
                  </span>
                </p>

                <div className="
                  flex
                  gap-3
                  flex-wrap
                  mb-5
                ">

                  

                  {workspace.owner === user?._id ? (

                    <button
                      onClick={() =>
                        handleDeleteWorkspace(
                          workspace._id
                        )
                      }

                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                      "
                    >
                      Delete
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        handleLeaveWorkspace(
                          workspace._id
                        )
                      }

                      className="
                        bg-yellow-500
                        text-black
                        px-4
                        py-2
                      "
                    >
                      Leave
                    </button>

                  )}

                </div>

                <p className="
                  text-slate-400
                  mb-5
                ">
                  Members:
                  {" "}
                  {
                    workspace.members
                      .length
                  }
                </p>

                <div className="
                  flex
                  flex-wrap
                  gap-3
                ">

                  {workspace.members.map(
                    (member: any) => (

                      <div
                        key={member._id}

                        className="
                          bg-cyan-400/10
                          border
                          border-cyan-400/20
                          px-4
                          py-2
                          text-sm

                          flex
                          items-center
                          gap-3
                        "
                      >

                        {member.name}

                        {workspace.owner === user?._id
                        && member._id !== user?._id && (

                          <button
                            onClick={() =>
                              handleRemoveMember(
                                workspace._id,
                                member._id
                              )
                            }

                            className="
                              text-red-400
                              font-bold
                            "
                          >
                            ✕
                          </button>

                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

      <div className="
        cyber-card
        p-7
      ">

        <h2 className="
          text-3xl
          font-black
          mb-8
        ">
          Public Workspaces
        </h2>

        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">

          {publicWorkspaces.map(
            (workspace) => (

              <div
                key={workspace._id}

                className="
                  border
                  border-cyan-400/10
                  p-6
                "
              >

                <h3 className="
                  text-2xl
                  font-bold
                  mb-4
                ">
                  {workspace.name}
                </h3>

                <p className="
                  text-slate-400
                  mb-4
                ">
                  Members:
                  {" "}
                  {
                    workspace.members
                      .length
                  }
                </p>

                <p className="
                  text-cyan-400
                  font-bold
                ">
                  Code:
                  {" "}
                  {
                    workspace.inviteCode
                  }
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </PageLayout>
  )
}