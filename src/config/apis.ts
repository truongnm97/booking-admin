export const GraphqlEndpoint = {
  MASTER: `${process.env.REACT_APP_BASE_URL}/api/master/graphql`,
  APPOINTMENT: `${process.env.REACT_APP_BASE_URL}/api/master/graphql`,
}

export const RestAPI = {
  LOGIN: `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
  LOGOUT: `${process.env.REACT_APP_BASE_URL}/api/auth/logout`,
  REFRESH_TOKEN: `${process.env.REACT_APP_BASE_URL}/api/auth/refresh-token`,
  GET_ME: `${process.env.REACT_APP_BASE_URL}/api/account/api/v1/account/getMe`,
}
