import { Button, Popconfirm, Space, Table, message } from 'antd'
import { COMMON } from 'constants/locales'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useDeleteBooking, useGetBookings } from 'apis/rest/booking'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

const BookingPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, refetch } = useGetBookings()
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
      width: 80,
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
    },
    {
      title: 'Function',
      width: 100,
      render: (value, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`edit/${record.id}`)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            placement="top"
            title={t(COMMON.CONFIRM_DELETE)}
            onConfirm={() => onDelete(record.id ?? '')}
            okText={t(COMMON.ACCEPT)}
            cancelText={t(COMMON.CANCEL)}
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <Button type="primary" onClick={() => navigate('create')}>
          <PlusOutlined /> {t(COMMON.CREATE)}
        </Button>
        <Table
          dataSource={data?.data}
          columns={columns}
          scroll={{ x: 'auto' }}
        />
      </Space>
    </div>
  )
}

export default BookingPage
