import { encodeQueryParams } from './encoding'
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

export const getHeaders = () => {
  const authToken = store.getState().auth?.token

  let headers: RequestInit['headers'] = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  }

  if (authToken) {
    headers.Token = authToken
  }

  return headers
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
    const res: AxiosResponse<IResponse> = await axios({
      ...config,
      url: finalUrl,
    })

    if (res.status >= 400) {
      const reason = `${res.status} - ${res.statusText}`

      throw new Error(reason)
    }

    if (!res.data.status) {
      const reason = `${res.data.code} - ${res.data.message}`

      throw new Error(reason)
    }

    return res.data
  } catch (err) {
    console.error(err)
    message.error((<Error>err).message)
    return new Error((<Error>err).message)
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
  return axios({
    ...config,
    headers: {
      ...getHeaders(),
      ...config.headers,
    },
    url,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as Promise<any>
}
