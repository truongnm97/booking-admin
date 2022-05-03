import { AdminRoutes } from 'constants/enum'
import { Button, Result, Spin } from 'antd'
import { COMMON } from 'constants/locales'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppState } from 'hooks'
import { useTranslation } from 'react-i18next'
import React from 'react'
import styles from './styles.module.scss'

interface Props {
  reverse?: boolean
  redirect?: string
  isAuthorized?: boolean
}

const AuthWrapper: React.FC<Props> = ({
  reverse,
  redirect = '/',
  isAuthorized = true,
  children,
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = useAppState(state => state.auth)
  const getMe = useAppState(state => state.getMe)

  const isAuthenticated = Boolean(token)
  const isAccessible = reverse ? !isAuthenticated : isAuthenticated

  return isAccessible ? (
    isAuthorized ? (
      <main>{children}</main>
    ) : getMe != null ? (
      <Result
        status="403"
        title="403"
        subTitle={t(COMMON.UNAUTHORIZE_PAGE)}
        extra={
          <Button type="primary" onClick={() => navigate(redirect)}>
            {t(COMMON.BACK_HOME)}
          </Button>
        }
      />
    ) : (
      <Spin size="large" className={styles.spin} />
    )
  ) : isAuthorized ? (
    <Navigate to={isAuthenticated ? redirect : AdminRoutes.LOGIN} />
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={t(COMMON.UNAUTHORIZE_PAGE)}
      extra={
        <Button type="primary" onClick={() => navigate(redirect)}>
          {t(COMMON.BACK_HOME)}
        </Button>
      }
    />
  )
}

export default AuthWrapper
