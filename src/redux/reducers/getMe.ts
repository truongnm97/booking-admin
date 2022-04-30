import { authActions } from 'redux/actions'
import { createReducer } from '@reduxjs/toolkit'

const getMeReducer = createReducer<IGetMeReducer | null>(null, builder =>
  builder
    .addCase(authActions.getMeAction.success, (state, action) => {
      return action.payload || null
    })
    .addCase(authActions.getMeAction.failure, () => {
      return null
    })
)

export default getMeReducer
