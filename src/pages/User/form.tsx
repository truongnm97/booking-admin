import { Button, Form, Input, Select, message } from 'antd'
import { FORM, LOGIN, USER } from 'constants/locales'
import { Role } from 'constants/enum'
import { useCreateUser, useEditUser, useGetUser } from 'apis/rest/user'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface IUserForm {
  email?: string
  firstName?: string
  lastName?: string
  role?: Role
  password?: string
}

const UserForm = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [form] = Form.useForm<IUserForm>()

  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()
  const { data, refetch } = useGetUser(id, {
    queryConfig: {
      enabled: false,
    },
  })
  const navigate = useNavigate()

  const onFinish = (data: IUserForm) => {
    if (id) {
      editUser(
        {
          id,
          request: {
            data,
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
      createUser(
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
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        role: data.data.role,
      })
    }
  }, [data])

  return (
    <Form {...layout} initialValues={data} form={form} onFinish={onFinish}>
      <Form.Item name="id" label="Id" hidden>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="email"
        label={t(USER.FORM_FIELD_EMAIL)}
        required
        rules={[
          { required: true, message: t(FORM.REQUIRED) },
          { type: 'email', message: t(LOGIN.INVALID_EMAIL) },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t(USER.FORM_FIELD_PASSWORD)}
        name="password"
        rules={[{ required: !id, message: t(LOGIN.PASSWORD_WARNING) }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="firstName"
        label={t(USER.FORM_FIELD_FIRST_NAME)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label={t(USER.FORM_FIELD_LAST_NAME)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="role"
        label={t(USER.FORM_FIELD_ROLE)}
        required
        rules={[{ required: true, message: t(FORM.REQUIRED) }]}
      >
        <Select>
          <Select.Option value={Role.ADMIN}>Admin</Select.Option>
          <Select.Option value={Role.USER}>User</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          {t(FORM.SUBMIT)}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserForm
