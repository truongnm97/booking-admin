import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'constants/enum'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import authRequest from 'utils/api'

export function useGetUsers(request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/users`

  return useQuery<AxiosResponse<IUser[]>, unknown>(
    [url, Method.GET],
    () => {
      return authRequest(url, { method: Method.GET })
    },
    request?.queryConfig
  )
}

export function useCreateUser() {
  const url = `${process.env.REACT_APP_BASE_URL}/users`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IUser>,
    Error,
    AxiosRequestConfig<IUserRequest>
  >(request => authRequest(url, { ...request, method: Method.POST }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
  })
}

export function useDeleteUser() {
  const url = `${process.env.REACT_APP_BASE_URL}/users`
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<IUser>, IResponseError, string>(
    id => authRequest(`${url}/${id}`, { method: Method.DELETE }),
    {
      onSuccess: (data, id) => {
        void queryClient.setQueryData([`${url}/${id}`, Method.DELETE], { data })
      },
    }
  )
}

export function useEditUser() {
  const url = `${process.env.REACT_APP_BASE_URL}/users`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IUser>,
    IResponseError,
    { id: string; request: AxiosRequestConfig<IUserRequest> }
  >(
    ({ id, request }) =>
      authRequest(`${url}/${id}`, { ...request, method: Method.PATCH }),
    {
      onSuccess: (data, { id }) => {
        void queryClient.setQueryData([`${url}/${id}`, Method.PATCH], {
          data,
        })
      },
    }
  )
}

export function useGetUser(id?: string, request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/users/${id}`

  return useQuery<AxiosResponse<IUser>>(
    [url, Method.GET],
    () => authRequest(url, { method: Method.GET }),
    request?.queryConfig
  )
}
