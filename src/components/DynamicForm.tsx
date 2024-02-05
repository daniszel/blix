import { useState } from 'react'
import { Button, Form, Input, Select, Checkbox } from 'antd'
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
        rules={[{ type: 'email' }, { required: true }]}
      >
        <Input placeholder='name@example.com' />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
        required
      >
        <Input.Password
          placeholder='Required'
          type='password'
        />
      </Form.Item>

      <Form.Item
        name='serverAddress'
        label='Server Address'
        rules={[
          {
            pattern: new RegExp('^(?!$)(www\\.)?[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$'),
            message: 'wrong format',
          },
        ]}
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
                rules={[
                  {
                    pattern: new RegExp('^[a-zA-Z0-9/]*$'),
                    message: 'wrong format',
                  },
                ]}
              >
                <Input placeholder='/calendars/users/' />
              </Form.Item>
              <Form.Item
                name='port'
                label='Port'
                rules={[
                  {
                    pattern: new RegExp(
                      '^(6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]\\d{4}|[1-9]\\d{0,3})$'
                    ),
                    message: 'wrong format',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='encrypt'
                label='Use SSL'
                valuePropName='checked'
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

      <Form.Item
        {...tailLayout}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
        shouldUpdate
      >
        {({ getFieldsValue }) => {
          const { username, password } = getFieldsValue()
          const formIsComplete = !!username && !!password
          return (
            <Button
              type='primary'
              htmlType='submit'
              disabled={!formIsComplete}
            >
              Submit
            </Button>
          )
        }}
      </Form.Item>
    </Form>
  )
}

export default DynamicForm
