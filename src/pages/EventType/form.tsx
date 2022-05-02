import { Button, Form, Input, message } from 'antd'
import { EVENT_TYPE, FORM } from 'constants/locales'
import {
  useCreateEventType,
  useEditEventType,
  useGetEventType,
} from 'apis/rest/eventType'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface IEventTypeForm {
  name: string
}

const EventTypeForm = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [form] = Form.useForm<IEventTypeForm>()

  const { mutate: createEventType } = useCreateEventType()
  const { mutate: editEventType } = useEditEventType(id)
  const { data, refetch } = useGetEventType(id, {
    queryConfig: {
      enabled: false,
    },
  })
  const navigate = useNavigate()

  const onFinish = (data: IEventTypeForm) => {
    if (id) {
      editEventType(
        {
          data,
        },
        {
          onSuccess: () => {
            message.success('Success')
            navigate(-1)
          },
        }
      )
    } else {
      createEventType(
        {
          data,
        },
        {
          onSuccess: () => {
            message.success('Success')
            navigate(-1)
          },
        }
      )
    }
  }

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.data.name,
      })
    }
  }, [data])

  return (
    <Form {...layout} initialValues={data} form={form} onFinish={onFinish}>
      <Form.Item name="id" label="Id" hidden>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="name"
        label={t(EVENT_TYPE.FORM_FIELD_NAME)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          {t(FORM.SUBMIT)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EventTypeForm
