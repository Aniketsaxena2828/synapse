import api from "@/lib/axios"

export const createWorkspace =
  async (
    data: {
      name: string
      isPrivate: boolean
    },

    token: string
  ) => {

    const response =
      await api.post(
        "/workspaces/create",
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }

export const getWorkspaces =
  async (
    token: string
  ) => {

    const response =
      await api.get(
        "/workspaces",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }

export const joinWorkspace =
  async (
    code: string,
    token: string
  ) => {

    const response =
      await api.post(
        "/workspaces/join",

        { code },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }

  export const deleteWorkspace =
  async (
    id: string,
    token: string
  ) => {

    const response =
      await api.delete(
        `/workspaces/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }

export const removeMember =
  async (
    workspaceId: string,
    memberId: string,
    token: string
  ) => {

    const response =
      await api.put(
        `/workspaces/${workspaceId}/remove-member`,
        { memberId },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }
  export const leaveWorkspace =
  async (
    workspaceId: string,
    token: string
  ) => {

    const response =
      await api.put(
        `/workspaces/${workspaceId}/leave`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.data
  }