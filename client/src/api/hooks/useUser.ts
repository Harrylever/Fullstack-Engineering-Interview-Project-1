import { getUser } from '../actions/user'
import { useQuery } from '@tanstack/react-query'

export function useGetUser(location: string) {
  return useQuery({ queryKey: ['user', location], queryFn: getUser })
}
