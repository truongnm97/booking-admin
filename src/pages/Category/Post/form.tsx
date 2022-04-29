import { Button, Form, Input, InputNumber, message } from 'antd'
import { useCreatePost, useEditPost, useGetPost } from 'apis/rest/posts'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const PostForm = () => {
  const { id } = useParams()
  const [form] = Form.useForm<IPostResponse>()

  const { mutate: createPost } = useCreatePost()
  const { mutate: editPost } = useEditPost(id)
  const { data, refetch } = useGetPost(id, {
    queryConfig: {
      enabled: false,
    },
  })
  const navigate = useNavigate()

  const onFinish = (data: IPostResponse) => {
    if (id) {
      editPost(
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
      createPost(
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
      form.setFieldsValue(data.data)
    }
  }, [data])

  return (
    <Form {...layout} initialValues={data} form={form} onFinish={onFinish}>
      <Form.Item name="id" label="Id">
        <Input disabled />
      </Form.Item>
      <Form.Item name="userId" label="User Id">
        <InputNumber />
      </Form.Item>
      <Form.Item name="body" label="Body">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PostForm
