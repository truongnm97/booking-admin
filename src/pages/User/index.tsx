import { Button, Popconfirm, Space, Table, Tag, Tooltip, message } from 'antd'
import { COMMON, USER } from 'constants/locales'
import { ColumnsType } from 'antd/lib/table'
import { DATE_TIME_FORMAT } from 'constants/datetime'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useDeleteUser, useGetUsers } from 'apis/rest/user'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import styles from './styles.module.scss'

const UserPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, refetch, isLoading } = useGetUsers()
  const { mutate: deleteUser } = useDeleteUser()

  const onCancelUser = (id?: string) => {
    if (!id) {
      return
    }

    deleteUser(id, {
      onSuccess: () => {
        message.success('Success')
        refetch()
      },
    })
  }

  let columns: ColumnsType<IUser> = [
    {
      title: t(USER.TABLE_TITLE_INDEX),
      width: 30,
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: t(USER.TABLE_TITLE_ID),
      width: 50,
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: t(USER.TABLE_TITLE_EMAIL),
      dataIndex: 'email',
      width: 120,
    },
    {
      title: t(USER.TABLE_TITLE_ROLE),
      dataIndex: 'role',
      width: 80,
      render: value => <Tag color="blue">{value}</Tag>,
    },
    {
      title: t(USER.TABLE_TITLE_FIRST_NAME),
      dataIndex: 'firstName',
      align: 'center',
      width: 80,
    },
    {
      title: t(USER.TABLE_TITLE_LAST_NAME),
      dataIndex: 'lastName',
      align: 'center',
      width: 80,
    },
    {
      title: t(USER.TABLE_TITLE_CREATED_AT),
      dataIndex: 'createdAt',
      width: 120,
      render: value => value && moment(value).format(DATE_TIME_FORMAT),
    },
    {
      title: t(USER.TABLE_TITLE_UPDATED_AT),
      dataIndex: 'updatedAt',
      width: 120,
      render: value => value && moment(value).format(DATE_TIME_FORMAT),
    },
    {
      title: t(USER.TABLE_TITLE_FUNCTION),
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title={t(USER.EDIT)}>
            <Button
              type="primary"
              onClick={() => navigate(`edit/${record.id}`)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title={t(USER.DELETE)}>
            <Popconfirm
              placement="top"
              title={t(COMMON.CONFIRM_DELETE)}
              onConfirm={() => onCancelUser(record.id)}
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

export default UserPage
