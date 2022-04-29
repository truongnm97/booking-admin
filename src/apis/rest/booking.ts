import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'constants/enum'
import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import authRequest from 'utils/api'

export function useGetBookings(request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings`

  return useQuery<AxiosResponse<IBooking[]>>(
    [url],
    () => authRequest(url, { method: Method.GET }),
    {
      ...request?.queryConfig,
      onError: err => {
        message.error((err as Error).message)
      },
    }
  )
}

export function useCreateBooking() {
  const url = `${process.env.REACT_APP_BASE_URL}/booking`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IBooking>,
    Error,
    AxiosRequestConfig<IBookingRequest>
  >(request => authRequest(url, { ...request, method: Method.POST }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
    onError: err => {
      message.error(err.message)
    },
  })
}
export function useDeleteBooking() {
  const url = `${process.env.REACT_APP_BASE_URL}/booking`
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<IBooking>, Error, string>(
    id => authRequest(url + `/${id}`, { method: Method.DELETE }),
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST], { data })
      },
      onError: err => {
        message.error(err.message)
      },
    }
  )
}

export function useEditBooking(id?: string) {
  const url = `${process.env.REACT_APP_BASE_URL}/booking/${id}`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IBooking>,
    Error,
    AxiosRequestConfig<IBookingRequest>
  >(request => authRequest(url, { ...request, method: Method.PUT }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },

    onError: err => {
      message.error(err.message)
    },
  })
}

export function useGetBooking(id?: string, request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/booking/${id}`

  return useQuery<AxiosResponse<IBooking>>(
    [url],
    () => authRequest(url, { method: Method.GET }),
    {
      ...request?.queryConfig,
      onError: err => {
        message.error((err as Error).message)
      },
    }
  )
}
