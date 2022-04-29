import { InMemoryCache, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient, ApolloLink } from '@apollo/client/core'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { onError } from 'apollo-link-error'
import { GraphqlEndpoint } from './apis'
import { getHeaders } from 'utils/api'
import { message } from 'antd'
import { responseMessage } from 'utils/notification'

type VisibilityFilter = {
  id: string
  displayName: string
}

const visibilityFilters: { [filter: string]: VisibilityFilter } = {
  SHOW_ALL: {
    id: 'show_all',
    displayName: 'All',
  },
  SHOW_COMPLETED: {
    id: 'show_completed',
    displayName: 'Completed',
  },
  SHOW_ACTIVE: {
    id: 'show_active',
    displayName: 'Active',
  },
}

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        visibilityFilter: {
          read() {
            return visibilityFilterVar()
          },
        },
      },
    },
  },
})

/**
 * Set initial values when we create cache variables.
 */

const visibilityFilterVar = makeVar<VisibilityFilter>(
  visibilityFilters.SHOW_ALL
)

const authLink = setContext((request, { headers }) => {
  return {
    headers: {
      ...getHeaders(),
      ...headers,
    },
  }
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log(`graphQLErrors`, graphQLErrors)
  }
) as any

const link = new MultiAPILink({
  endpoints: {
    master: GraphqlEndpoint.MASTER,
    appointment: GraphqlEndpoint.APPOINTMENT,
  },
  createHttpLink: () => createHttpLink() as any,
})

const activityMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation)?.map(res => {
    const operationType: 'query' | 'mutation' = (
      operation.query.definitions[0] as any
    )?.operation
    if (res.errors && res.errors.length > 0) {
      res.errors.forEach(error => {
        message.error(error.message)
      })
    } else {
      if (
        res.data?.[operation.operationName]?.code === 'SUCCESS' ||
        res.data?.[operation.operationName]?.status === 1
      ) {
        if (operationType === 'mutation') {
          responseMessage(res.data?.[operation.operationName])
        }
      } else {
        if (res?.data?.[operation.operationName]) {
          responseMessage(res.data?.[operation.operationName])
        } else {
          if (res.data?.response?.code.includes('TOKEN_')) {
            // logout
          }
          responseMessage(res.data)
        }
      }
    }

    return res
  })
})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(ApolloLink.from([activityMiddleware, link, errorLink])),
})
