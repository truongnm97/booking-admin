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
  lasttName?: string
  role: import('constants/enum').Role
  createdAt: string
  updatedAt: string
}

interface IBooking {
  id?: string
  name?: string
  description?: string
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  status?: import('constants/enum').BookingStatus
  eventType?: import('constants/enum').EventType
}

interface IBookingRequest {
  id?: string
  name?: string
  status?: import('constants/enum').BookingStatus
  location?: string
  proposalDates?: string[]
  selectedDate?: string
  eventType?: import('constants/enum').EventType
}
