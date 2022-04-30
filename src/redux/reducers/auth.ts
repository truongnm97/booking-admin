import { authActions } from 'redux/actions'
import { createReducer } from '@reduxjs/toolkit'

const authReducer = createReducer<string | null>(null, builder =>
  builder
    .addCase(authActions.loginAction.success, (token, action) => {
      return action.payload.access_token || null
    })
    .addCase(authActions.loginAction.failure, () => {
      return null
    })
    .addCase(authActions.logoutAction.success, () => {
      return null
    })
    .addCase(authActions.logoutAction.failure, () => {
      return null
    })
)

export default authReducer
