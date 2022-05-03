import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'constants/enum'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import authRequest from 'utils/api'

export function useGetEventTypes(request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/event-type`

  return useQuery<AxiosResponse<IEventType[]>, unknown>(
    [url],
    () => {
      return authRequest(url, { method: Method.GET })
    },
    {
      ...request?.queryConfig,
    }
  )
}

export function useCreateEventType() {
  const url = `${process.env.REACT_APP_BASE_URL}/event-type`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IEventType>,
    Error,
    AxiosRequestConfig<IEventTypeRequest>
  >(request => authRequest(url, { ...request, method: Method.POST }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
  })
}
export function useDeleteEventType() {
  const url = `${process.env.REACT_APP_BASE_URL}/event-type`
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<IEventType>, IResponseError, string>(
    id => authRequest(url + `/${id}`, { method: Method.DELETE }),
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST], { data })
      },
    }
  )
}

export function useEditEventType(id?: string) {
  const url = `${process.env.REACT_APP_BASE_URL}/event-type/${id}`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IEventType>,
    IResponseError,
    AxiosRequestConfig<IEventTypeRequest>
  >(request => authRequest(url, { ...request, method: Method.PATCH }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
  })
}

export function useGetEventType(id?: string, request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/event-type/${id}`

  return useQuery<AxiosResponse<IEventType>>(
    [url],
    () => authRequest(url, { method: Method.GET }),
    {
      ...request?.queryConfig,
    }
  )
}
