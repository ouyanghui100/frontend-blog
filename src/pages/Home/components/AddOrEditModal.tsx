import React from 'react'
import { Modal, Form, Input } from 'antd'

interface EditModalProps {
  open: boolean
  title: string
  initialName?: string
  loading?: boolean
  onOk: (name: string) => void
  onCancel: () => void
}

const AddOrEditModal: React.FC<EditModalProps> = ({
  open,
  title,
  initialName,
  loading,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (open) {
      form.setFieldsValue({ name: initialName })
    }
  }, [open, initialName, form])

  const handleFinish = (values: { name: string }) => {
    onOk(values.name)
  }

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnHidden
    >
      <Form
        form={form}
        initialValues={{ name: initialName }}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddOrEditModal
