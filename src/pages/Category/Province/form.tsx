import { Button, Form, Input, InputNumber } from 'antd'
import { COMMON } from 'constants/locales'
import { useEffect } from 'react'
import {
  useLazyQueryProvinceDetail,
  useSaveProvince,
} from 'apis/graphql/category'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
}

const ProvinceForm = () => {
  const { id } = useParams()
  const [form] = Form.useForm<IProvince>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [getProvince, { data }] = useLazyQueryProvinceDetail()
  const [saveProvince] = useSaveProvince({
    onCompleted: res => {
      if (res.saveProvince?.status) {
        navigate(-1)
      }
    },
  })

  const onFinish = (data: IProvince) => {
    saveProvince({
      variables: { data },
    })
  }

  useEffect(() => {
    if (id) {
      getProvince({
        variables: {
          provinceId: id,
        },
      })
    }
  }, [id])

  useEffect(() => {
    if (data?.provinces?.data) {
      form.setFieldsValue(data.provinces.data)
    }
  }, [data])

  return (
    <Form {...layout} initialValues={data} form={form} onFinish={onFinish}>
      <Form.Item name="code" label="Code">
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="orders" label="Order">
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.labelCol, offset: 3 }}>
        <Button type="primary" htmlType="submit">
          {t(COMMON.SUBMIT)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProvinceForm
