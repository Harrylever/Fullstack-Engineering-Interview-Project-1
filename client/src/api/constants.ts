import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
  withCredentials: true,
  timeout: 150000,
})
