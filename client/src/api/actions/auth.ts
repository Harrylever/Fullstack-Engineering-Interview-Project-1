import { IUser } from 'src/types/interfaces'
import { axiosInstance } from '../constants'

export async function registerUser(user: IUser) {
  const fetch = await axiosInstance.post('/auth/register', user)
  return fetch.data
}

export async function loginUser(credentials: {
  email: string
  password: string
}) {
  const fetch = await axiosInstance.post('/auth/login', credentials)
  return fetch.data
}

export async function logoutUser() {
  const fetch = await axiosInstance.get('/auth/logout')
  return fetch.data
}
