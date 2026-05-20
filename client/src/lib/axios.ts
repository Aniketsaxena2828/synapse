import axios from "axios"

const api = axios.create({
  baseURL: "https://synapse-mx36.onrender.com/api",
  withCredentials: true,
})

export default api