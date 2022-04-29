import { AdminRoutes, BookingRoutes } from 'constants/enum'
import { BOOKING, MENU } from 'constants/locales'
import { BookingPage, DashboardPage } from 'pages'
import { getFlatMap, getMap } from 'utils/array'
import { DashboardOutlined, ReadOutlined } from '@ant-design/icons'
import BookingForm from 'pages/Booking/form'

export const WHITELIST_ROUTES: string[] = [
  AdminRoutes.DASHBOARD,
  AdminRoutes.BOOKING,
  BookingRoutes.BOOKING_CREATE,
  BookingRoutes.BOOKING_EDIT,
]

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
    id: AdminRoutes.BOOKING,
    path: AdminRoutes.BOOKING,
    name: MENU.BOOKING,
    subTitle: BOOKING.DETAIL,
    auth: true,
    component: <BookingPage />,
    icon: <ReadOutlined />,
  },
  {
    id: BookingRoutes.BOOKING_CREATE,
    path: BookingRoutes.BOOKING_CREATE,
    name: BOOKING.CREATE,
    subTitle: BOOKING.CREATE_DETAIL,
    auth: true,
    hide: true,
    component: <BookingForm />,
  },
  {
    id: BookingRoutes.BOOKING_EDIT,
    path: `${BookingRoutes.BOOKING_EDIT}/:id`,
    name: BOOKING.EDIT,
    subTitle: BOOKING.EDIT_DETAIL,
    auth: true,
    hide: true,
    component: <BookingForm />,
  },
]

export const MenuConfigFlat: IMenu[] = getFlatMap(MenuConfig)

export const MenuConfigMap: Record<string, IMenu> = getMap(
  MenuConfigFlat,
  'path'
)
