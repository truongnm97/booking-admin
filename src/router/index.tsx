import { AdminRoutes } from 'constants/enum'
import { AuthWrapper, Container } from 'components/common'
import { Button, Result } from 'antd'
import { COMMON } from 'constants/locales'
import { LoginPage } from 'pages'
import { MenuConfig } from 'config/menu'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { checkAuthorization } from 'utils/auth'
import { useAppState } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Router() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const me = useAppState(state => state.getMe)

  const renderRoutes = (_menu: IMenu[]) =>
    _menu.map(val => {
      const isAuthorized = checkAuthorization(val, me?.role)

      return val.children ? (
        <Route
          key={val.id}
          path={val.path}
          element={
            val.auth ? (
              <AuthWrapper>{val.component ?? <Outlet />}</AuthWrapper>
            ) : (
              val.component ?? <Outlet />
            )
          }
        >
          {renderRoutes(val.children)}
        </Route>
      ) : (
        <Route
          key={val.id}
          path={val.path}
          element={
            val.auth ? (
              <AuthWrapper isAuthorized={isAuthorized}>
                {val.component}
              </AuthWrapper>
            ) : (
              val.component
            )
          }
        />
      )
    })

  return (
    <Routes>
      <Route element={<Container />}>{renderRoutes(MenuConfig)}</Route>
      <Route
        path={AdminRoutes.LOGIN}
        element={
          <AuthWrapper isAuthorized reverse>
            <LoginPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/"
        element={
          <AuthWrapper isAuthorized>
            <Navigate to={AdminRoutes.BOOKING} />
          </AuthWrapper>
        }
      />
      <Route
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle={t(COMMON.NONEXISTENCE_PAGE)}
            extra={
              <Button type="primary" onClick={() => navigate('/')}>
                {t(COMMON.BACK_HOME)}
              </Button>
            }
          />
        }
      />
    </Routes>
  )
}

export default Router
