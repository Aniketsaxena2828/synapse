import api from "@/lib/axios"

export const getTasks = async (
  token: string
) => {

  const response = await api.get(
    "/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export const createTask = async (
  data: {
    title: string
    description: string
    projectId: string
  },
  token: string
) => {

  const response = await api.post(
    "/tasks",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data
}

export const updateTaskStatus = async (
  taskId: string,
  status: string,
  token: string
) => {

  const response = await api.patch(
    `/tasks/${taskId}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
export const deleteTask = async (
  taskId: string,
  token: string
) => {

  const response = await api.delete(
    `/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}