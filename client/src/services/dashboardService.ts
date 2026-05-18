import api from "@/lib/axios"

export const getDashboardData =
async (
  token: string
) => {

  const response =
    await api.get(
      "/dashboard",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

  return response.data
}