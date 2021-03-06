import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { LOGIN } from 'constants/locales'
import { loginAction } from 'redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

interface IForm {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onFinish = (values: IForm) => {
    dispatch(
      loginAction.request({
        email: values.email,
        password: values.password,
      })
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ email: '', password: '', remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
      >
        <Typography.Title level={3} className={styles.label}>
          {t(LOGIN.LABEL)}
        </Typography.Title>
        <Form.Item
          label={t(LOGIN.EMAIL)}
          name="email"
          rules={[
            { required: true, message: t(LOGIN.USERNAME_WARNING) },
            { type: 'email', message: t(LOGIN.INVALID_EMAIL) },
          ]}
        >
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item
          label={t(LOGIN.PASSWORD)}
          name="password"
          rules={[{ required: true, message: t(LOGIN.PASSWORD_WARNING) }]}
        >
          <Input.Password className={styles.input} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>{t(LOGIN.REMEMBER_ME)}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t(LOGIN.LABEL)}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
