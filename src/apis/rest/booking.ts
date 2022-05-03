import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'constants/enum'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import authRequest from 'utils/api'

export function useGetBookings(
  request?: IFetcherRequest,
  params: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
) {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/${params.page}/${params.pageSize}`

  return useQuery<AxiosResponse<IResponsePagination<IBooking>>, unknown>(
    [url, params],
    () => {
      return authRequest(url, { method: Method.GET })
    },
    {
      ...request?.queryConfig,
    }
  )
}

export function useCreateBooking() {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IBooking>,
    Error,
    AxiosRequestConfig<IBookingRequest>
  >(request => authRequest(url, { ...request, method: Method.POST }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
  })
}
export function useDeleteBooking() {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings`
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<IBooking>, IResponseError, string>(
    id => authRequest(url + `/${id}`, { method: Method.DELETE }),
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST], { data })
      },
    }
  )
}

export function useEditBooking(id?: string) {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/${id}`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IBooking>,
    IResponseError,
    AxiosRequestConfig<IBookingRequest>
  >(request => authRequest(url, { ...request, method: Method.PATCH }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
  })
}

export function useGetBooking(id?: string, request?: IFetcherRequest) {
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/${id}`

  return useQuery<AxiosResponse<IBooking>>(
    [url],
    () => authRequest(url, { method: Method.GET }),
    {
      ...request?.queryConfig,
    }
  )
}

export function useApproveBooking() {
  const queryClient = useQueryClient()
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/approve`

  return useMutation<
    AxiosResponse<IBooking>,
    IResponseError,
    AxiosRequestConfig<IApproveBookingRequest>
  >(
    request => {
      return authRequest(url, { ...request, method: Method.POST })
    },
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST, variables], { data })
      },
    }
  )
}

export function useRejectBooking() {
  const queryClient = useQueryClient()
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/reject`

  return useMutation<
    AxiosResponse<IBooking>,
    IResponseError,
    AxiosRequestConfig<IRejectBookingRequest>
  >(
    request => {
      return authRequest(url, { ...request, method: Method.POST })
    },
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST, variables], { data })
      },
    }
  )
}

export function useCancelBooking() {
  const queryClient = useQueryClient()
  const url = `${process.env.REACT_APP_BASE_URL}/bookings/cancel`

  return useMutation<
    AxiosResponse<IBooking>,
    IResponseError,
    AxiosRequestConfig<ICancelBookingRequest>
  >(
    request => {
      return authRequest(url, { ...request, method: Method.POST })
    },
    {
      onSuccess: (data, variables) => {
        void queryClient.setQueryData([url, Method.POST, variables], { data })
      },
    }
  )
}
