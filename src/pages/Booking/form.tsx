import { BOOKING, FORM } from 'constants/locales'
import { Button, DatePicker, Form, Input, Select, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {
  useCreateBooking,
  useEditBooking,
  useGetBooking,
} from 'apis/rest/booking'
import { useEffect } from 'react'
import { useGetEventTypes } from 'apis/rest/eventType'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const layoutWithOutLabel = {
  wrapperCol: { offset: 6, span: 18 },
}

interface IBookingForm {
  location: string
  eventTypeId: string
  proposalDates: moment.Moment[]
}

const BookingForm = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [form] = Form.useForm<IBookingForm>()

  const { mutate: createBooking } = useCreateBooking()
  const { mutate: editBooking } = useEditBooking(id)
  const { data, refetch } = useGetBooking(id, {
    queryConfig: {
      enabled: false,
    },
  })
  const { data: eventTypes } = useGetEventTypes()
  const navigate = useNavigate()

  const onFinish = (data: IBookingForm) => {
    if (id) {
      editBooking(
        {
          data: {
            ...data,
            proposalDates: data.proposalDates.map(date => date.toJSON()),
          },
        },
        {
          onSuccess: () => {
            message.success('Success')
            navigate(-1)
          },
        }
      )
    } else {
      createBooking(
        {
          data: {
            ...data,
            proposalDates: data.proposalDates.map(date => date.toJSON()),
          },
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
      form.setFieldsValue(data.data)
    }
  }, [data])

  return (
    <Form {...layout} initialValues={data} form={form} onFinish={onFinish}>
      <Form.Item name="id" label="Id" hidden>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="location"
        label={t(BOOKING.FORM_FIELD_LOCATION)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="eventTypeId"
        label={t(BOOKING.FORM_FIELD_EVENT_TYPE)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Select>
          {eventTypes?.data.map(eventType => (
            <Select.Option key={eventType.id} value={eventType.id ?? ''}>
              {eventType.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="proposalDates" initialValue={[null]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? layout : layoutWithOutLabel)}
                label={index === 0 ? t(BOOKING.FORM_FIELD_PROPOSAL_DATE) : ''}
                required
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[{ required: true, message: t(FORM.REQUIRED) }]}
                  noStyle
                >
                  <DatePicker
                    showTime
                    placeholder={t(FORM.PLACEHOLDER_SELECT_DATE)}
                    onChange={() => {
                      if (fields.length < 3) add()
                    }}
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </Form.Item>
            ))}
            {fields.length < 3 && (
              <Form.Item wrapperCol={{ span: 4, offset: 6 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t(BOOKING.FORM_FIELD_ADD_PROPOSAL_DATE)}
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ span: 2, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          {t(FORM.SUBMIT)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BookingForm
