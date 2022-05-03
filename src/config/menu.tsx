import {
  AdminRoutes,
  BookingRoutes,
  EventTypeRoutes,
  Role,
  UserRoutes,
} from 'constants/enum'
import { BOOKING, EVENT_TYPE, MENU, USER } from 'constants/locales'
import { BookingPage } from 'pages'
import { getFlatMap, getMap } from 'utils/array'
import { ReadOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons'
import BookingForm from 'pages/Booking/form'
import EventTypePage from 'pages/EventType'
import EventTypeForm from 'pages/EventType/form'
import UserPage from 'pages/User'
import UserForm from 'pages/User/form'

export const WHITELIST_ROUTES: string[] = []

export const MenuConfig: IMenu[] = [
  {
    id: AdminRoutes.BOOKING,
    path: AdminRoutes.BOOKING,
    name: MENU.BOOKING,
    subTitle: BOOKING.DETAIL,
    auth: true,
    component: <BookingPage />,
    icon: <ReadOutlined />,
    role: [Role.ADMIN, Role.USER],
  },
  {
    id: BookingRoutes.BOOKING_CREATE,
    path: BookingRoutes.BOOKING_CREATE,
    name: BOOKING.CREATE,
    subTitle: BOOKING.CREATE_DETAIL,
    auth: true,
    hide: true,
    component: <BookingForm />,
    role: [Role.ADMIN, Role.USER],
  },
  {
    id: BookingRoutes.BOOKING_EDIT,
    path: `${BookingRoutes.BOOKING_EDIT}/:id`,
    name: BOOKING.EDIT,
    subTitle: BOOKING.EDIT_DETAIL,
    auth: true,
    hide: true,
    component: <BookingForm />,
    role: [Role.ADMIN, Role.USER],
  },
  {
    id: AdminRoutes.EVENT_TYPE,
    path: AdminRoutes.EVENT_TYPE,
    name: MENU.EVENT_TYPE,
    subTitle: EVENT_TYPE.DETAIL,
    auth: true,
    component: <EventTypePage />,
    icon: <ScheduleOutlined />,
    role: [Role.ADMIN],
  },
  {
    id: EventTypeRoutes.EVENT_TYPE_CREATE,
    path: EventTypeRoutes.EVENT_TYPE_CREATE,
    name: EVENT_TYPE.CREATE,
    subTitle: EVENT_TYPE.CREATE_DETAIL,
    auth: true,
    hide: true,
    component: <EventTypeForm />,
    role: [Role.ADMIN],
  },
  {
    id: EventTypeRoutes.EVENT_TYPE_EDIT,
    path: `${EventTypeRoutes.EVENT_TYPE_EDIT}/:id`,
    name: EVENT_TYPE.EDIT,
    subTitle: EVENT_TYPE.EDIT_DETAIL,
    auth: true,
    hide: true,
    component: <EventTypeForm />,
    role: [Role.ADMIN],
  },
  {
    id: AdminRoutes.USER,
    path: AdminRoutes.USER,
    name: MENU.USER,
    subTitle: USER.DETAIL,
    auth: true,
    component: <UserPage />,
    icon: <UserOutlined />,
    role: [Role.ADMIN],
  },
  {
    id: UserRoutes.USER_CREATE,
    path: UserRoutes.USER_CREATE,
    name: USER.CREATE,
    subTitle: USER.CREATE_DETAIL,
    auth: true,
    hide: true,
    component: <UserForm />,
    role: [Role.ADMIN],
  },
  {
    id: UserRoutes.USER_EDIT,
    path: `${UserRoutes.USER_EDIT}/:id`,
    name: USER.EDIT,
    subTitle: USER.EDIT_DETAIL,
    auth: true,
    hide: true,
    component: <UserForm />,
    role: [Role.ADMIN],
  },
]

export const MenuConfigFlat: IMenu[] = getFlatMap(MenuConfig)

export const MenuConfigMap: Record<string, IMenu> = getMap(
  MenuConfigFlat,
  'path'
)
