import { axiosInstance } from '../constants'

export async function getUser() {
  const fetch = await axiosInstance.get(`/users/single`)
  return fetch.data
}
