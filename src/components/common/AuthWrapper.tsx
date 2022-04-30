import { AdminRoutes } from 'constants/enum'
import { Button, Result, Spin } from 'antd'
import { COMMON } from 'constants/locales'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppState } from 'hooks'
import { useTranslation } from 'react-i18next'
import React from 'react'

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

  const unauthorizeElement =
    getMe != null ? (
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
      <Spin size="large" />
    )

  return isAccessible ? (
    isAuthorized ? (
      <main>{children}</main>
    ) : (
      unauthorizeElement
    )
  ) : isAuthorized ? (
    <Navigate to={isAuthenticated ? redirect : AdminRoutes.LOGIN} />
  ) : (
    unauthorizeElement
  )
}

export default AuthWrapper
