import { authActions } from 'redux/actions'
import { createReducer } from '@reduxjs/toolkit'
import { getMap } from 'utils/array'

const getMeReducer = createReducer<IGetMeReducer | null>(null, builder =>
  builder
    .addCase(authActions.getMeAction.success, (state, action) => {
      return action.payload.data
        ? {
            ...action.payload.data,
            functionsMap: getMap(action.payload.data.functions, 'functionCode'),
          }
        : null
    })
    .addCase(authActions.getMeAction.failure, () => {
      return null
    })
)

export default getMeReducer
