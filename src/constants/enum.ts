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
  PENDING_REVIEW = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum EventType {
  HEALTH_TALK = 'HEALTH_TALK',
  WELLNESS_EVENT = 'WELLNESS_EVENT',
  FITNESS_ACTIVITIES = 'FITNESS_ACTIVITIES',
}
