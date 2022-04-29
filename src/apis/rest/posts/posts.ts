import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'constants/enum'
import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import authRequest from 'utils/api'

export function useGetPosts(request?: IFetcherRequest) {
  const url = `${'https://jsonplaceholder.typicode.com'}/posts`

  return useQuery<AxiosResponse<IPostResponse[]>>(
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

export function useCreatePost() {
  const url = `${'https://jsonplaceholder.typicode.com'}/posts`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IPostResponse>,
    Error,
    AxiosRequestConfig<IPostRequest>
  >(request => authRequest(url, { ...request, method: Method.POST }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },
    onError: err => {
      message.error(err.message)
    },
  })
}
export function useDeletePost() {
  const url = `${'https://jsonplaceholder.typicode.com'}/posts`
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<IPostResponse>, Error, string>(
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

export function useEditPost(id?: string) {
  const url = `${'https://jsonplaceholder.typicode.com'}/posts/${id}`
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<IPostResponse>,
    Error,
    AxiosRequestConfig<IPostRequest>
  >(request => authRequest(url, { ...request, method: Method.PUT }), {
    onSuccess: (data, variables) => {
      void queryClient.setQueryData([url, Method.POST, variables], { data })
    },

    onError: err => {
      message.error(err.message)
    },
  })
}

export function useGetPost(id?: string, request?: IFetcherRequest) {
  const url = `${'https://jsonplaceholder.typicode.com'}/posts/${id}`

  return useQuery<AxiosResponse<IPostResponse>>(
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
