export enum Lang {
  EN = 'en',
  VI = 'vi',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum AdminRoutes {
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  BOOKING = '/booking',
}

export enum BookingRoutes {
  BOOKING = 'booking',
  BOOKING_CREATE = 'booking/create',
  BOOKING_EDIT = 'booking/edit',
}

export enum BookingStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
