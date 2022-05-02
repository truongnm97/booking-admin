import { Method } from 'constants/enum'
import { RestAPI } from 'config/apis'
import { authActions } from 'redux/actions'
import { client } from 'config/apollo'
import { createApiSaga } from 'utils/saga'
import { queryClient } from 'config/cached'

export const loginSaga = createApiSaga<typeof authActions.loginAction>(
  authActions.loginAction,
  ({ email, password }) => ({
    url: RestAPI.LOGIN,
    config: {
      method: Method.POST,
      data: {
        email,
        password,
      },
    },
  })
)

export const logoutSaga = createApiSaga<typeof authActions.logoutAction>(
  authActions.logoutAction,
  () => {
    client.clearStore()
    queryClient.clear()
    return {
      url: RestAPI.LOGOUT,
      config: {
        method: Method.POST,
      },
    }
  }
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
