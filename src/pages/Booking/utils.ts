import { BOOKING } from 'constants/locales'
import { BookingStatus } from 'constants/enum'

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
