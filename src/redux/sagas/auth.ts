import { Method } from 'constants/enum'
import { RestAPI } from 'config/apis'
import { authActions } from 'redux/actions'
import { createApiSaga } from 'utils/saga'

export const loginSaga = createApiSaga<typeof authActions.loginAction>(
  authActions.loginAction,
  ({ username, password, loginType }) => ({
    url: RestAPI.LOGIN,
    config: {
      method: Method.POST,
      data: {
        username,
        password,
        loginType,
      },
    },
  })
)

export const logoutSaga = createApiSaga<typeof authActions.logoutAction>(
  authActions.logoutAction,
  () => ({
    url: RestAPI.LOGOUT,
    config: {
      method: Method.POST,
    },
  })
)

export const getMeSaga = createApiSaga<typeof authActions.getMeAction>(
  authActions.getMeAction,
  () => ({
    url: RestAPI.GET_ME,
    config: {
      method: Method.GET,
    },
  })
)
