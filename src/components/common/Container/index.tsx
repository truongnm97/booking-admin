import {
  Avatar,
  Breadcrumb,
  Dropdown,
  Layout,
  Menu,
  PageHeader,
  Space,
} from 'antd'
import { COMMON, MENU } from 'constants/locales'
import { LangConfig } from 'config/i18n'
import {
  Link,
  Outlet,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { LogoSVG } from 'assets/svg'
import { MenuConfig, MenuConfigMap, WHITELIST_ROUTES } from 'config/menu'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import { authActions } from 'redux/actions'
import { getMeAction } from 'redux/actions/auth'
import { useAppState } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import styles from './styles.module.scss'

const { Header, Content, Footer, Sider } = Layout

const Container = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const [selectedMenu, setSelectedMenu] = useState<IMenu>()
  const token = useAppState(state => state.auth)
  const me = useAppState(state => state.getMe)

  const renderMenu = useCallback(
    (_menu?: IMenu[], _path?: string) =>
      _menu?.map(val => {
        const path = _path ? `${_path}/${val.path}` : val.path

        const isAuthorized =
          WHITELIST_ROUTES.includes(val.id) ||
          (me?.role && val.role?.includes(me.role))

        return val.hide ? null : val.children ? (
          <Menu.SubMenu
            key={val.id}
            icon={val.icon}
            title={val.name && t(val.name)}
          >
            {renderMenu(val.children, path)}
          </Menu.SubMenu>
        ) : isAuthorized ? (
          <Menu.Item key={val.id} icon={val.icon}>
            <Link to={path ?? '/'}>{val.name && t(val.name)}</Link>
          </Menu.Item>
        ) : null
      }),
    [me]
  )

  const renderBreadcrumb = useCallback(
    (_menu?: IMenu[]) => {
      const pathSnippets = pathname
        .split('/')
        .filter(Boolean)
        .map((val, idx) => (idx === 0 ? `/${val}` : val))

      return (
        <Breadcrumb>
          {pathSnippets?.map(val => {
            const title = MenuConfigMap[val]?.name
            return (
              <Breadcrumb.Item key={val}>{title && t(title)}</Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      )
    },
    [pathname]
  )

  const onLogout = () => {
    dispatch(authActions.logoutAction.request())
  }

  const menu = (
    <Menu>
      <Menu.Item key="SignOut" icon={<PoweroffOutlined />} onClick={onLogout}>
        <span>{t(MENU.LOGOUT)}</span>
      </Menu.Item>
    </Menu>
  )

  const language = (
    <Menu>
      {Object.entries(LangConfig).map(([key, { icon, name }]) => (
        <Menu.Item
          key={key}
          icon={icon}
          onClick={() => i18n.changeLanguage(key)}
        >
          <span>{t(name)}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  const findSelectedMenu = (_menu: IMenu[], _path?: string) => {
    for (const val of _menu) {
      const path = _path ? `${_path}/${val.path}` : val.path

      if (matchPath(path ?? '', pathname)) {
        setSelectedMenu(val)
        break
      }

      if (val.children) {
        findSelectedMenu(val.children, path)
      }
    }
  }

  useEffect(() => {
    findSelectedMenu(MenuConfig)
  }, [pathname])

  useEffect(() => {
    if (token) {
      dispatch(getMeAction.request())
    }
  }, [token])

  return (
    <Layout className={styles['layout-container']}>
      <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo}>
          <LogoSVG />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={
            selectedMenu && selectedMenu.id ? [selectedMenu.id] : []
          }
        >
          {renderMenu(MenuConfig)}
        </Menu>
      </Sider>
      <Layout
        className={clsx(styles['site-layout'], collapsed && styles.collapsed)}
      >
        <Header className={styles['site-layout-background']}>
          {collapsed ? (
            <MenuUnfoldOutlined
              className={styles['trigger']}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              className={styles['trigger']}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <Space size={16} align="center">
            <div className={styles.language}>
              <Dropdown overlay={language} className={styles.account}>
                <span className={styles.language}>
                  {LangConfig[i18n.language]?.icon}
                </span>
              </Dropdown>
            </div>
            <Dropdown overlay={menu} className={styles.account}>
              <Space>
                <span>
                  <span>Hi, </span>
                  <span>{`${me?.firstName ?? ''} ${me?.lastName ?? ''}`}</span>
                </span>
                <Avatar />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content className={styles.content}>
          <PageHeader
            className={styles['site-page-header']}
            title={
              selectedMenu && selectedMenu.name ? t(selectedMenu.name) : ''
            }
            onBack={() => navigate(-1)}
            breadcrumbRender={() => renderBreadcrumb()}
            subTitle={
              selectedMenu && selectedMenu.subTitle
                ? t(selectedMenu.subTitle)
                : ''
            }
          >
            <Outlet />
          </PageHeader>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{t(COMMON.FOOTER)}</Footer>
      </Layout>
    </Layout>
  )
}

export default Container
