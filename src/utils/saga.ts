/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvokeApiProps, invokeApi } from './api'
import { PayloadActionCreator } from '@reduxjs/toolkit'
import { Task } from 'redux-saga'
import { all, call, cancel, fork, put, take } from 'redux-saga/effects'

export type AsyncActionRequestPayload<A extends AsyncAction> = ReturnType<
  A['request']
>['payload']

export type AsyncActionSuccessPayload<A extends AsyncAction> = ReturnType<
  A['success']
>['payload']

export type InvokeApiPropsOrInvokeApiPropsCreator<A extends AsyncAction> =
  | ((requestPayload: AsyncActionRequestPayload<A>) => InvokeApiProps)
  | InvokeApiProps

export type GenericSaga = () => Generator

export enum AsyncStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface AsyncState {
  status: AsyncStatus
  error: Error | null
}

export interface AsyncAction {
  request: PayloadActionCreator<any, any>
  success: PayloadActionCreator<any, any>
  failure: PayloadActionCreator<any, any>
  cancel: PayloadActionCreator<any, any>
}

/**
 * Create a saga that handles API calls from start to finish
 */
export const createApiSaga = <A extends AsyncAction>(
  asyncAction: A,
  invokeApiPropsOrInvokeApiPropsCreator: InvokeApiPropsOrInvokeApiPropsCreator<A>
): GenericSaga => {
  function* invokeApiSaga(action: ReturnType<A['request']>) {
    const invokeApiProps =
      typeof invokeApiPropsOrInvokeApiPropsCreator === 'function'
        ? invokeApiPropsOrInvokeApiPropsCreator(action.payload)
        : invokeApiPropsOrInvokeApiPropsCreator

    try {
      const invokeApiRes: IResponse = yield call(invokeApi, invokeApiProps)

      if (invokeApiRes instanceof Error) {
        yield put(asyncAction.failure(invokeApiRes.message))
      } else {
        yield put(asyncAction.success(invokeApiRes))
      }
    } catch (err) {
      yield put(asyncAction.failure((<Error>err).message))
    }
  }

  return function* invokeApiWatcherSaga() {
    let previousTask: Task | undefined

    while (true) {
      const action = yield take(asyncAction.request)

      if (previousTask) {
        yield cancel(previousTask)
      }

      previousTask = (yield fork(
        invokeApiSaga,
        action as ReturnType<A['request']>
      )) as Task

      // TODO: ...how to trigger cancellation???
      //  ...
    }
  }
}

export const combineSagas = (sagas: GenericSaga[]): GenericSaga => {
  return function* combinedSaga() {
    yield all(sagas.map(saga => fork(saga)))
  }
}
