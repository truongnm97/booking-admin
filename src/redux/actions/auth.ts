import { createAction } from '@reduxjs/toolkit'

export interface ILoginRequestPayload {
  username: string
  password: string
  loginType: 3
}

export const loginAction = {
  request: createAction<ILoginRequestPayload, '@AUTH/LOGIN/REQUEST'>(
    '@AUTH/LOGIN/REQUEST'
  ),
  success: createAction<IResponse<IUser>, '@AUTH/LOGIN/SUCCESS'>(
    '@AUTH/LOGIN/SUCCESS'
  ),
  failure: createAction<Error, '@AUTH/LOGIN/FAILURE'>('@AUTH/LOGIN/FAILURE'),
  cancel: createAction<undefined, '@AUTH/LOGIN/CANCEL'>('@AUTH/LOGIN/CANCEL'),
}

export const logoutAction = {
  request: createAction<undefined, '@AUTH/LOGOUT'>('@AUTH/LOGOUT'),
  success: createAction<undefined, '@AUTH/LOGOUT/SUCCESS'>(
    '@AUTH/LOGOUT/SUCCESS'
  ),
  failure: createAction<Error, '@AUTH/LOGOUT/FAILURE'>('@AUTH/LOGOUT/FAILURE'),
  cancel: createAction<undefined, '@AUTH/LOGOUT/CANCEL'>('@AUTH/LOGOUT/CANCEL'),
}

export const getMeAction = {
  request: createAction<undefined, '@AUTH/GET_ME'>('@AUTH/GET_ME'),
  success: createAction<IResponse<IGetMe>, '@AUTH/GET_ME/SUCCESS'>(
    '@AUTH/GET_ME/SUCCESS'
  ),
  failure: createAction<Error, '@AUTH/GET_ME/FAILURE'>('@AUTH/GET_ME/FAILURE'),
  cancel: createAction<undefined, '@AUTH/GET_ME/CANCEL'>('@AUTH/GET_ME/CANCEL'),
}
