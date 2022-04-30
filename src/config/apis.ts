export const GraphqlEndpoint = {
  MASTER: `${process.env.REACT_APP_BASE_URL}/api/master/graphql`,
  APPOINTMENT: `${process.env.REACT_APP_BASE_URL}/api/master/graphql`,
}

export const RestAPI = {
  LOGIN: `${process.env.REACT_APP_BASE_URL}/auth/signIn`,
  LOGOUT: `${process.env.REACT_APP_BASE_URL}/auth/signOut`,
  GET_ME: `${process.env.REACT_APP_BASE_URL}/users/me`,
}
