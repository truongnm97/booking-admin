import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import { applyMiddleware, compose, createStore } from 'redux'
import { authReducer, getMeReducer } from './reducers'
import { combineReducers } from '@reduxjs/toolkit'
import sagaMiddlewareFactory from 'redux-saga'
import sagas from './sagas'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig<IAppState> = {
  storage,
  key: 'root',
  whitelist: ['auth'],
}

const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  getMe: getMeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = sagaMiddlewareFactory()

const composeEnhancers =
  ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
    typeof window !== 'undefined' &&
    (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)) || // eslint-disable-line
  compose

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)

export const persistor = persistStore(store)

export default store
