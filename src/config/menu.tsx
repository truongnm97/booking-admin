import { AdminRoutes, CategoryRoutes } from 'constants/enum'
import { MENU } from 'constants/locales'
import { DashboardPage } from 'pages'
import { getFlatMap, getMap } from 'utils/array'
import {
  DashboardOutlined,
  ReadOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { PostForm, PostPage, ProvinceForm, ProvincePage } from 'pages/Category'

export const WHITELIST_ROUTES: string[] = [AdminRoutes.DASHBOARD]

export const MenuConfig: IMenu[] = [
  {
    id: AdminRoutes.DASHBOARD,
    path: AdminRoutes.DASHBOARD,
    name: MENU.DASHBOARD,
    subTitle: MENU.DASHBOARD,
    auth: true,
    component: <DashboardPage />,
    icon: <DashboardOutlined />,
  },
  {
    id: 'DM',
    path: AdminRoutes.CATEGORY,
    name: MENU.CATEGORY,
    subTitle: MENU.CATEGORY,
    icon: <ReadOutlined />,
    auth: true,
    children: [
      {
        id: 'DMTT_ACCEPT',
        path: CategoryRoutes.PROVINCE,
        name: MENU.CATEGORY_PROVINCE,
        subTitle: MENU.CATEGORY_PROVINCE,
        icon: <ProfileOutlined />,
        auth: true,
        component: <ProvincePage />,
      },
      {
        id: 'saveProvince',
        path: CategoryRoutes.PROVINCE_CREATE,
        name: MENU.CATEGORY_PROVINCE_CREATE,
        subTitle: MENU.CATEGORY_PROVINCE_CREATE,
        auth: true,
        hide: true,
        component: <ProvinceForm />,
      },
      {
        id: 'saveProvince',
        path: `${CategoryRoutes.PROVINCE_EDIT}/:id`,
        name: MENU.CATEGORY_PROVINCE_EDIT,
        subTitle: MENU.CATEGORY_PROVINCE_EDIT,
        auth: true,
        hide: true,
        component: <ProvinceForm />,
      },
      {
        id: 'DMQH_ACCEPT',
        path: CategoryRoutes.POST,
        name: MENU.CONTENT_POST,
        icon: <ProfileOutlined />,
        auth: true,
        component: <PostPage />,
      },
      {
        id: 'saveDistrict',
        path: CategoryRoutes.POST_CREATE,
        name: MENU.CONTENT_POST_CREATE,
        auth: true,
        hide: true,
        component: <PostForm />,
      },
      {
        id: 'saveDistrict',
        path: `${CategoryRoutes.POST_EDIT}/:id`,
        name: MENU.CONTENT_POST_EDIT,
        auth: true,
        hide: true,
        component: <PostForm />,
      },
    ],
  },
]

export const MenuConfigFlat: IMenu[] = getFlatMap(MenuConfig)

export const MenuConfigMap: Record<string, IMenu> = getMap(
  MenuConfigFlat,
  'path'
)
