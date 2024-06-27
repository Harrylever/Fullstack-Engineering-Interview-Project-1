import { AxiosResponse } from 'axios'
import { IUser } from 'src/types/interfaces'
import { useMutation, useQuery } from '@tanstack/react-query'
import { loginUser, logoutUser, registerUser } from '../actions/auth'

export function useLoginUser() {
  return useMutation<AxiosResponse, Error, { email: string; password: string }>(
    {
      mutationFn: ({ email, password }) => loginUser({ email, password }),
    }
  )
}

export function useRegisterUser() {
  return useMutation<AxiosResponse, Error, IUser>({
    mutationFn: (user) => registerUser(user),
  })
}

export function useLogoutUser() {
  return useQuery<AxiosResponse, Error>({
    queryKey: ['logout'],
    queryFn: () => logoutUser(),
  })
}
