import axios from "axios"

const API =
  "http://localhost:5000/api/tasks"

export const getTasks =
  async (
    workspaceId: string,
    token: string
  ) => {

    const res =
      await axios.get(

        `${API}/${workspaceId}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }

export const createTask =
  async (
    data: any,
    token: string
  ) => {

    const res =
      await axios.post(

        API,

        data,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }

export const updateTask =
  async (
    id: string,
    data: any,
    token: string
  ) => {

    const res =
      await axios.put(

        `${API}/${id}`,

        data,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }

export const deleteTask =
  async (
    id: string,
    token: string
  ) => {

    const res =
      await axios.delete(

        `${API}/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return res.data
  }