import api from "@/lib/axios"

export const getProjects = async (
  token: string
) => {

  const response = await api.get(
    "/projects",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const createProject = async (
  data: {
    title: string
    description: string
  },

  token: string
) => {

  const response = await api.post(
    "/projects",
    {
      title: data.title,
      description: data.description,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const deleteProject = async (
  id: string,
  token: string
) => {

  const response = await api.delete(
    `/projects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}