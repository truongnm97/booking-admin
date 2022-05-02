import { Button, Popconfirm, Space, Table, Tooltip, message } from 'antd'
import { COMMON, EVENT_TYPE } from 'constants/locales'
import { ColumnsType } from 'antd/lib/table'
import { DATE_TIME_FORMAT } from 'constants/datetime'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useDeleteEventType, useGetEventTypes } from 'apis/rest/eventType'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import styles from './styles.module.scss'

const EventTypePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, refetch, isLoading } = useGetEventTypes()
  const { mutate: deleteEventType } = useDeleteEventType()

  const onCancelEventType = (id?: string) => {
    if (!id) {
      return
    }

    deleteEventType(id, {
      onSuccess: () => {
        message.success('Success')
        refetch()
      },
    })
  }

  let columns: ColumnsType<IEventType> = [
    {
      title: t(EVENT_TYPE.TABLE_TITLE_INDEX),
      width: 30,
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: t(EVENT_TYPE.TABLE_TITLE_ID),
      width: 50,
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: t(EVENT_TYPE.TABLE_TITLE_NAME),
      dataIndex: 'name',
      align: 'center',
      width: 80,
    },
    {
      title: t(EVENT_TYPE.TABLE_TITLE_CREATED_AT),
      dataIndex: 'createdAt',
      width: 120,
      render: value => value && moment(value).format(DATE_TIME_FORMAT),
    },
    {
      title: t(EVENT_TYPE.TABLE_TITLE_UPDATED_AT),
      dataIndex: 'updatedAt',
      width: 120,
      render: value => value && moment(value).format(DATE_TIME_FORMAT),
    },
    {
      title: t(EVENT_TYPE.TABLE_TITLE_FUNCTION),
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title={t(EVENT_TYPE.EDIT)}>
            <Button
              type="primary"
              onClick={() => navigate(`edit/${record.id}`)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title={t(EVENT_TYPE.DELETE)}>
            <Popconfirm
              placement="top"
              title={t(COMMON.CONFIRM_DELETE)}
              onConfirm={() => onCancelEventType(record.id)}
              okText={t(COMMON.ACCEPT)}
              cancelText={t(COMMON.DELETE)}
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

  return (
    <Space className={styles.container} direction="vertical">
      <Button type="primary" onClick={() => navigate('create')}>
        <PlusOutlined /> {t(COMMON.CREATE)}
      </Button>
      <Table
        dataSource={data?.data}
        columns={columns}
        scroll={{ x: 'auto' }}
        rowKey={record => record.id ?? ''}
        loading={isLoading}
        pagination={false}
      />
    </Space>
  )
}

export default EventTypePage
