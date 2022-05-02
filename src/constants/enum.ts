export enum Lang {
  EN = 'en',
  VI = 'vi',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum AdminRoutes {
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  BOOKING = '/booking',
  EVENT_TYPE = '/event-type',
}

export enum BookingRoutes {
  BOOKING = 'booking',
  BOOKING_CREATE = 'booking/create',
  BOOKING_EDIT = 'booking/edit',
}

export enum EventTypeRoutes {
  EVENT_TYPE = 'event-type',
  EVENT_TYPE_CREATE = 'event-type/create',
  EVENT_TYPE_EDIT = 'event-type/edit',
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
