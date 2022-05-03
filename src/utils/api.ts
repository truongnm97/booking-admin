import { encodeQueryParams } from './encoding'
import { logoutAction } from 'redux/actions/auth'
import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from 'redux/store'

export interface InvokeApiProps {
  // If a URL is provided, will use it and ignore the 'path', 'queryParams', and
  // 'hash' parameters.
  url?: string

  // If no URL is provided, these parameters will be used to construct the URL.
  path?: string
  queryParams?: { [key: string]: string }
  hash?: string

  // Native fetch()'s requestInit parameter
  config?: AxiosRequestConfig
}

const axiosProvider = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
})

export const getHeaders = () => {
  const authToken = store.getState().auth

  return authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : null
}

/**
 * Request API for redux-saga
 */
export const invokeApi = async ({
  url,
  path,
  queryParams,
  hash,
  config,
}: InvokeApiProps) => {
  // ---------- Construct the URL ---------- //

  let finalUrl: string
  if (!url) {
    const urlPath = path ? `${encodeURI(path)}` : '/'
    const urlQueryParams = queryParams && `?${encodeQueryParams(queryParams)}`
    const urlHash = hash ? `#${encodeURIComponent(hash)}` : ''

    finalUrl = `${urlPath}${urlQueryParams}${urlHash}`
  } else {
    finalUrl = url
  }

  if (config) {
    config.headers = {
      ...getHeaders(),
      ...config.headers,
    }
  }

  try {
    const res: AxiosResponse<IResponse> = await axiosProvider({
      ...config,
      url: finalUrl,
    })

    return res.data
  } catch (err) {
    const res = (<IResponseError>err).response
    if (res.status === 401) {
      store.dispatch(logoutAction.request())
    }
    console.error(res.data?.message)
    message.error(res.data?.message)
    throw err
  }
}

/**
 * A standard private (authentication required) route fetcher function for
 * react-query.
 */
export default async function authRequest<
  Response = IResponse,
  Request = unknown
>(url: string, config: AxiosRequestConfig<Request>) {
  try {
    const res = await axiosProvider({
      ...config,
      headers: {
        ...getHeaders(),
        ...config.headers,
      },
      url,
    })

    return res
  } catch (err) {
    const res = (<IResponseError>err).response
    if (res.status === 401) {
      store.dispatch(logoutAction.request())
    }
    console.error(res.data?.message)
    message.error(res.data?.message)
    throw err
  }
}
