import { BOOKING, COMMON } from 'constants/locales'
import { BookingStatus, Role } from 'constants/enum'
import { BookingStatusOptions } from './utils'
import {
  Button,
  Popconfirm,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  Tooltip,
  message,
} from 'antd'
import {
  CheckCircleTwoTone,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { DATE_FORMAT, TIME_FORMAT } from 'constants/datetime'
import { truncate } from 'lodash'
import { useAppState } from 'hooks'
import {
  useApproveBooking,
  useCancelBooking,
  useGetBookings,
  useRejectBooking,
} from 'apis/rest/booking'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookingModal from './modal'
import moment from 'moment'
import styles from './styles.module.scss'

const BookingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const me = useAppState(state => state.getMe)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>()
  const [modalType, setModalType] = useState<BookingStatus | null>()
  const { mutate: approveBooking } = useApproveBooking()
  const { mutate: rejectBooking } = useRejectBooking()
  const { mutate: cancelBooking } = useCancelBooking()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('pageSize')) || 10
  const { data, refetch, isLoading } = useGetBookings({}, { page, pageSize })

  const onApproveBooking = (id?: string, selectedDate?: string) => {
    approveBooking(
      {
        data: {
          id,
          selectedDate,
        },
      },
      {
        onSuccess: () => {
          message.success('Success')
          refetch()
        },
      }
    )
  }

  const onRejectBooking = (id?: string, rejectReason?: string) => {
    rejectBooking(
      {
        data: {
          id,
          rejectReason,
        },
      },
      {
        onSuccess: () => {
          message.success('Success')
          refetch()
        },
      }
    )
  }

  const onCancelBooking = (id?: string) => {
    cancelBooking(
      {
        data: {
          id,
        },
      },
      {
        onSuccess: () => {
          message.success('Success')
          refetch()
        },
      }
    )
  }

  const onOpenModal = (booking: IBooking, modalType: BookingStatus) => {
    setSelectedBooking(booking)
    setIsModalVisible(true)
    setModalType(modalType)
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
    setSelectedBooking(null)
    setModalType(null)
  }

  const onConfirm = (value?: string) => {
    if (!value) {
      return
    }

    if (modalType === BookingStatus.APPROVED) {
      onApproveBooking(selectedBooking?.id, value)
    } else if (modalType === BookingStatus.REJECTED) {
      onRejectBooking(selectedBooking?.id, value)
    }
    onCloseModal()
  }

  const onTableChange = (pagination: TablePaginationConfig) => {
    setSearchParams({
      page: pagination.current?.toString() ?? '1',
      pageSize: pagination.pageSize?.toString() ?? '10',
    })
  }

  let columns: ColumnsType<IBooking> = [
    {
      title: t(BOOKING.TABLE_TITLE_INDEX),
      width: 30,
      align: 'center',
      render: (text, record, index) =>
        data?.data && (data.data.page - 1) * data.data.pageSize + index + 1,
    },
    {
      title: t(BOOKING.TABLE_TITLE_ID),
      width: 50,
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: t(BOOKING.TABLE_TITLE_EVENT_TYPE),
      dataIndex: 'status',
      align: 'center',
      width: 80,
      key: 'status',
      render: (status: BookingStatus | undefined) =>
        status &&
        BookingStatusOptions[status] && (
          <Tag color={BookingStatusOptions[status].color}>
            {t(BookingStatusOptions[status].label)}
          </Tag>
        ),
    },
    {
      title: t(BOOKING.TABLE_TITLE_EVENT_TYPE),
      dataIndex: 'eventType',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <Tag color="default">{record.eventType?.name}</Tag>
      ),
    },
    {
      title: t(BOOKING.TABLE_TITLE_LOCATION),
      dataIndex: 'location',
      width: 120,
      ellipsis: true,
    },
    {
      title: t(BOOKING.TABLE_TITLE_PROPOSAL_DATE),
      dataIndex: 'proposalDates',
      width: 120,
      render: (value: string[] | undefined, record) => (
        <Space direction="vertical">
          {value?.map((date, i) => (
            <Space key={i} size={0.5}>
              <Tag color={date === record.selectedDate ? 'green' : 'geekblue'}>
                {moment(date).format(DATE_FORMAT)}
              </Tag>
              <Tag color={date === record.selectedDate ? 'green' : 'geekblue'}>
                {moment(date).format(TIME_FORMAT)}
              </Tag>
              {date === record.selectedDate && (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              )}
            </Space>
          ))}
        </Space>
      ),
    },
    {
      title: t(BOOKING.TABLE_TITLE_REASON_REJECTION),
      dataIndex: 'rejectReason',
      width: 120,
      render: value => (
        <Tooltip placement="topLeft" title={value}>
          {truncate(value, { length: 50 })}
        </Tooltip>
      ),
    },
    {
      title: t(BOOKING.TABLE_TITLE_FUNCTION),
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {me?.role === Role.ADMIN &&
            record.status === BookingStatus.PENDING_REVIEW && (
              <>
                <Tooltip title={t(BOOKING.APPROVE)}>
                  <Button
                    type="primary"
                    onClick={() => onOpenModal(record, BookingStatus.APPROVED)}
                  >
                    <CheckOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title={t(BOOKING.REJECT)}>
                  <Button
                    type="primary"
                    danger
                    onClick={() => onOpenModal(record, BookingStatus.REJECTED)}
                  >
                    <CloseOutlined />
                  </Button>
                </Tooltip>
              </>
            )}
          <Tooltip title={t(BOOKING.CANCEL)}>
            <Popconfirm
              placement="top"
              title={t(COMMON.CONFIRM_CANCEL)}
              onConfirm={() => onCancelBooking(record.id)}
              okText={t(COMMON.ACCEPT)}
              cancelText={t(COMMON.CANCEL)}
            >
              <Button type="default" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  if (me?.role === Role.ADMIN) {
    columns.splice(columns.length - 2, 0, {
      title: t(BOOKING.TABLE_TITLE_CREATED_BY),
      dataIndex: 'user',
      width: 100,
      render: (user: IGetMe | undefined) => {
        return user?.email
      },
    })
  }

  return (
    <Space className={styles.container} direction="vertical">
      <Button type="primary" onClick={() => navigate('create')}>
        <PlusOutlined /> {t(COMMON.CREATE)}
      </Button>
      <Table
        dataSource={data?.data.data}
        columns={columns}
        scroll={{ x: 'auto' }}
        rowKey={record => record.id ?? ''}
        pagination={{
          current: data?.data.page,
          pageSize: data?.data.pageSize,
          total: data?.data.total,
          showSizeChanger: true,
        }}
        onChange={onTableChange}
        loading={isLoading}
      />
      <BookingModal
        isVisible={isModalVisible}
        handleCancel={onCloseModal}
        modalType={modalType}
        booking={selectedBooking}
        handleOk={onConfirm}
      />
    </Space>
  )
}

export default BookingPage
