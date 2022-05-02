import './config/i18n'
import 'antd/dist/antd.css'
import 'styles/common.scss'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, Result, Spin } from 'antd'
import { Lang } from 'constants/enum'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import { client } from 'config/apollo'
import { queryClient } from 'config/cached'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import enUS from 'antd/lib/locale/en_US'
import i18n from './config/i18n'
import reportWebVitals from './reportWebVitals'
import store, { persistor } from 'redux/store'
import viVN from 'antd/lib/locale/vi_VN'

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={<Result icon={<Spin size="large" />} title={'Loading'} />}
    >
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={<Spin size="large" />} persistor={persistor}>
              <ConfigProvider locale={i18n.language === Lang.VI ? viVN : enUS}>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </ConfigProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ApolloProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
