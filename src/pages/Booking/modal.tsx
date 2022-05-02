import { BOOKING } from 'constants/locales'
import { BookingStatus } from 'constants/enum'
import { DATE_TIME_FORMAT } from 'constants/datetime'
import { Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

interface BookingModalProps {
  isVisible: boolean
  modalType?: BookingStatus | null
  booking?: IBooking | null
  handleOk: (value?: string) => void
  handleCancel: () => void
}

const BookingModal = ({
  isVisible,
  modalType,
  booking,
  handleCancel,
  handleOk,
}: BookingModalProps) => {
  const [rejectReason, setRejectReason] = useState<string>()
  const [selectedDate, setSelectedDate] = useState<string>()
  const { t } = useTranslation()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRejectReason(e.target.value)
  }

  const onSelectDate = (value: string) => {
    setSelectedDate(value)
  }

  useEffect(() => {
    if (!isVisible) {
      setRejectReason('')
      setSelectedDate('')
    }
  }, [isVisible])

  return (
    <Modal
      title={
        modalType === BookingStatus.APPROVED
          ? `${t(BOOKING.APPROVE)}: ${booking?.id}`
          : modalType === BookingStatus.REJECTED
          ? `${t(BOOKING.REJECT)}: ${booking?.id}`
          : ''
      }
      visible={isVisible}
      onOk={() =>
        handleOk(
          modalType === BookingStatus.APPROVED
            ? selectedDate
            : modalType === BookingStatus.REJECTED
            ? rejectReason
            : ''
        )
      }
      onCancel={handleCancel}
    >
      {modalType === BookingStatus.APPROVED ? (
        <Select
          placeholder={t(BOOKING.SELECT_PROPOSAL_DATE)}
          value={selectedDate || undefined}
          onChange={onSelectDate}
          style={{ width: '100%' }}
        >
          {booking?.proposalDates?.map(date => (
            <Select.Option key={date} value={date}>
              {moment(date).format(DATE_TIME_FORMAT)}
            </Select.Option>
          ))}
        </Select>
      ) : modalType === BookingStatus.REJECTED ? (
        <Input
          value={rejectReason}
          onChange={onInputChange}
          placeholder={t(BOOKING.REJECT_REASON)}
        />
      ) : null}
    </Modal>
  )
}

export default BookingModal
