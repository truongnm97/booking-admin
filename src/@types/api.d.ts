interface IResponse<T = any> {
  data?: T
  status?: number
  code?: string
  message?: string
}

interface IRequestProps<T> extends RequestInit {
  data?: T
}
interface IPostResponse {
  userId?: string
  id?: string
  title?: string
  body?: string
}

interface IPostRequest {
  userId?: string
  id?: string
  title?: string
  body?: string
}

interface IFetcherRequest {
  queryConfig?: import('react-query').UseQueryOptions<any>
}

interface IFunction {
  id: string
  functionCode: string
  name: string
  parentId?: string
}

interface IUserFacilities {
  id: string
  userId?: string
  facilityId?: string
  facilityCode?: string
  status?: number
  createDate?: string
  createUserId?: string
  createUser?: string
  updateUser?: string
  updateUserId?: string
  updateDate?: string
}

interface IUser {
  id: string
  userTypeId?: string
  name?: string
  userName?: string
  password?: string
  phone?: string
  email?: string
  avatar?: string
  address?: string
  sex?: string
  birthDate?: string
  facilityId?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  userGroups?: any[]
  userFunctions?: any[]
  userWeb?: string
  passWeb?: string
  notifys?: { appType: number; isRead: number; numOfNotify: number }[]
  staffCode?: string
  agentId?: string
  device?: string
  districtId?: string
  domain?: string
  functionCode?: string
  infoComplete?: boolean
  loginType?: number
  organization?: string
  os?: string
  otpCode?: string
  provinceId?: string
  refreshToken?: string
  sessionCount?: number
  token?: string
  tokenVcc?: string
  topic?: string
  userType?: string
  username?: string
  wardId?: string
}

interface IGetMe {
  user: IUser | null
  functions: IFunction[]
  userFacilities: IUserFacilities[]
}

interface IProvince {
  code?: string
  name?: string
  status?: number
  createDate?: string
  createUser?: string
  createUserId?: string
  id?: string
  updateDate?: string
  updateUser?: string
  updateUserId?: string
  orders?: number
}

enum BookingStatus {
  PENDING_REVIEW = 1,
  APPROVED = 2,
  REJECTED = 3,
}

enum EventType {
  HEALTH_TALK = HEALTH_TALK,
  WELLNESS_EVENT = WELLNESS_EVENT,
  FITNESS_ACTIVITIES = FITNESS_ACTIVITIES,
}

interface IBooking {
  id?: string
  name?: string
  status?: BookingStatus
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  eventType?: EventType
}

interface IBookingRequest {
  id?: string
  name?: string
  status?: BookingStatus
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  eventType?: EventType
}
