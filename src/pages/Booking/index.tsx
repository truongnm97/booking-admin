import { BookingStatus, EventType } from 'constants/enum'
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd'
import { COMMON } from 'constants/locales'
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { DATE_FORMAT, TIME_FORMAT } from 'constants/datetime'
import { format } from 'date-fns'
import { useDeleteBooking, useGetBookings } from 'apis/rest/booking'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

const mockData: IBooking[] = [
  {
    id: '1',
    name: 'Booking 1',
    location: 'Thuy Khue, Ha Noi',
    eventType: EventType.FITNESS_ACTIVITIES,
    proposalDates: [
      '2020-01-01T12:00:00Z',
      '2020-01-02T12:00:00Z',
      '2020-01-03T12:00:00Z',
    ],
    status: BookingStatus.PENDING_REVIEW,
  },
  {
    id: '2',
    name: 'Booking 2',
    location: 'Dong Anh, Ha Noi',
    eventType: EventType.FITNESS_ACTIVITIES,
    proposalDates: [
      '2020-01-01T12:00:00Z',
      '2020-01-02T12:00:00Z',
      '2020-01-03T12:00:00Z',
    ],
    status: BookingStatus.APPROVED,
  },
  {
    id: '3',
    name: 'Booking 1',
    location: 'Vo Chi Cong, Ha Noi',
    eventType: EventType.FITNESS_ACTIVITIES,
    proposalDates: [
      '2020-01-01T12:00:00Z',
      '2020-01-02T12:00:00Z',
      '2020-01-03T12:00:00Z',
    ],
    status: BookingStatus.REJECTED,
  },
]

const BookingStatusOptions = {
  [BookingStatus.PENDING_REVIEW]: {
    color: 'blue',
    label: 'BOOKING/PENDING_REVIEW',
  },
  [BookingStatus.APPROVED]: {
    color: 'green',
    label: 'BOOKING/APPROVED',
  },
  [BookingStatus.REJECTED]: {
    color: 'red',
    label: 'BOOKING/REJECTED',
  },
}

const BookingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { refetch } = useGetBookings()
  const { mutate: deleteBooking } = useDeleteBooking()

  const onDelete = (id: string) => {
    deleteBooking(id, {
      onSuccess: () => {
        message.success('Success')
        refetch()
      },
    })
  }

  const columns: ColumnsType<IBooking> = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: (status: BookingStatus) =>
        BookingStatusOptions[status] && (
          <Tag color={BookingStatusOptions[status].color}>
            {t(BookingStatusOptions[status].label)}
          </Tag>
        ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Proposal Date',
      dataIndex: 'proposalDates',
      width: 100,
      render: (value: string[], record) => (
        <Space direction="vertical">
          {value.map((date, i) => (
            <Space key={i} size={0.5}>
              <Tag color="blue">{format(new Date(date), DATE_FORMAT)}</Tag>
              <Tag color="geekblue">{format(new Date(date), TIME_FORMAT)}</Tag>
            </Space>
          ))}
        </Space>
      ),
    },
    {
      title: 'Function',
      width: 100,
      fixed: 'right',
      render: (value, record) => (
        <Space>
          <Button type="primary" onClick={() => {}}>
            <CheckOutlined />
          </Button>
          <Popconfirm
            placement="top"
            title={t(COMMON.CONFIRM_DELETE)}
            onConfirm={() => onDelete(record.id ?? '')}
            okText={t(COMMON.ACCEPT)}
            cancelText={t(COMMON.CANCEL)}
          >
            <Button type="primary" danger>
              <CloseOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Space className={styles.container} direction="vertical">
      <Button type="primary" onClick={() => navigate('create')}>
        <PlusOutlined /> {t(COMMON.CREATE)}
      </Button>
      <Table dataSource={mockData} columns={columns} scroll={{ x: 'auto' }} />
    </Space>
  )
}

export default BookingPage
