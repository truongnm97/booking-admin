interface IResponse<T = any> {
  data?: T
  status?: number
  code?: string
  message?: string
}

interface IError {
  error: string
  message: string
  statusCode: number
}

interface IResponseError {
  response: IResponse<IError>
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

interface ILoginResponse {
  access_token: string
}

interface IGetMe {
  id?: string
  email: string
  hash: string
  firstName?: string
  lastName?: string
  role: import('constants/enum').Role
  createdAt: string
  updatedAt: string
}

interface IResponsePagination<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
}

interface IBooking {
  id?: string
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  status?: import('constants/enum').BookingStatus
  eventTypeId?: string
  eventType?: IEventType
  createdAt?: string
  updatedAt?: string
}

interface IBookingRequest {
  id?: string
  name?: string
  status?: import('constants/enum').BookingStatus
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  eventTypeId?: string
  rejectReason?: string
}

interface IEventType {
  id?: string
  name?: string
  createdAt?: string
  updatedAt?: string
}

interface IEventTypeRequest {
  name?: string
}
interface IApproveBookingRequest {
  id?: string
  selectedDate?: string
}

interface IRejectBookingRequest {
  id?: string
  rejectReason?: string
}

interface ICancelBookingRequest {
  id?: string
  selectedDate?: string
}
