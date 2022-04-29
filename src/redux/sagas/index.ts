import * as authSagas from './auth'
import { combineSagas } from 'utils/saga'

const authRootSaga = combineSagas([
  authSagas.loginSaga,
  authSagas.logoutSaga,
  authSagas.getMeSaga,
])

export default authRootSaga
