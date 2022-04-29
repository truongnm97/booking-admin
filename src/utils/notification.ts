/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd'

export const responseMessage = (data: any) => {
  if (data?.response) {
    message.error(data?.response?.message)
  } else {
    if (data?.status === 1 || data?.code === 'SUCCESS') {
      message.success(data?.message)
    } else {
      message.error(data?.message)
    }
  }
}
