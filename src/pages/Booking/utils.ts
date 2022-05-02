import { BOOKING } from 'constants/locales'
import { BookingStatus, EventType } from 'constants/enum'

export const BookingStatusOptions = {
  [BookingStatus.PENDING_REVIEW]: {
    color: 'blue',
    label: BOOKING.PENDING_REVIEW,
  },
  [BookingStatus.APPROVED]: {
    color: 'green',
    label: BOOKING.APPROVED,
  },
  [BookingStatus.REJECTED]: {
    color: 'red',
    label: BOOKING.REJECTED,
  },
}

export const EventTypeOptions = {
  [EventType.FITNESS_ACTIVITIES]: {
    label: BOOKING.FITNESS_ACTIVITIES,
  },
  [EventType.HEALTH_TALK]: {
    label: BOOKING.HEALTH_TALK,
  },
  [EventType.WELLNESS_EVENT]: {
    label: BOOKING.WELLNESS_EVENT,
  },
}
