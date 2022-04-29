import { Button, Popconfirm, Space, Table, message } from 'antd'
import { COMMON } from 'constants/locales'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useDeletePost, useGetPosts } from 'apis/rest/posts'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

const PostPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data, refetch } = useGetPosts()
  const { mutate: deletePost } = useDeletePost()

  const onDelete = (id: string) => {
    deletePost(id, {
      onSuccess: () => {
        message.success('Success')
        refetch()
      },
    })
  }

  const columns: ColumnsType<IPostResponse> = [
    {
      title: 'User Id',
      dataIndex: 'userId',
      width: 100,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
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

export default PostPage
