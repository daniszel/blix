import { useState } from 'react'
import { Button, Form, Input, Select, Space, Checkbox } from 'antd'
import { CheckboxProps } from 'antd'

const { Option } = Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {}

const DynamicForm: React.FC = () => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(true)

  const onFinish = (values: string) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  const onChange: CheckboxProps['onChange'] = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <Form
      {...layout}
      form={form}
      name='dynamic-form'
      onFinish={onFinish}
      style={{ width: '400px' }}
    >
      <Form.Item
        name='accountType'
        label='Account Type'
        initialValue={'manual'}
      >
        <Select>
          <Option value='manual'>Manual</Option>
          <Option value='advanced'>Advanced</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='username'
        label='User Name'
      >
        <Input
          placeholder='name@example.com'
          type='email'
          required
        />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
      >
        <Input
          placeholder='Required'
          type='password'
          required
        />
      </Form.Item>

      <Form.Item
        name='serverAddress'
        label='Server Address'
      >
        <Input placeholder='example.com' />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.accountType !== currentValues.accountType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('accountType') === 'advanced' ? (
            <>
              <Form.Item
                name='serverPath'
                label='Server Path'
              >
                <Input placeholder='/calendars/users/' />
              </Form.Item>
              <Form.Item
                name='port'
                label='Port'
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='encrypt'
                label='Use SSL'
              >
                <Checkbox
                  checked={checked}
                  onChange={onChange}
                />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
          <Button
            htmlType='button'
            onClick={onReset}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default DynamicForm
