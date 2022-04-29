import { Button, Popconfirm, Space, Table } from 'antd'
import { COMMON } from 'constants/locales'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useQueryProvince, useRemoveProvince } from 'apis/graphql/category'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

const ProvincePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: provinceData } = useQueryProvince()
  const [removeProvince] = useRemoveProvince()

  const onDelete = (id: string) => {
    removeProvince({
      variables: {
        id,
      },
    })
  }

  const columns: ColumnsType<IProvince> = [
    {
      title: 'Code',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
    },
    {
      title: 'Order',
      dataIndex: 'orders',
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
      <Space direction="vertical" className={styles['table-container']}>
        <Button type="primary" onClick={() => navigate('create')}>
          <PlusOutlined /> {t(COMMON.CREATE)}
        </Button>
        <Table
          dataSource={provinceData?.provinces?.data}
          columns={columns}
          scroll={{ x: 'auto' }}
        />
      </Space>
    </div>
  )
}

export default ProvincePage
