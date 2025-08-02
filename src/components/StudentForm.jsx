import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, Card } from 'antd';

const { Option } = Select;

const StudentForm = ({
  initialValues,
  onFinish,
  title,
  submitText,
  onCancel,
}) => {
  const [form] = Form.useForm();

  // 当初始值变化时更新表单
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Card title={title} style={{ marginBottom: 20 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || { stu_sex: '男' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="stu_name"
          label="姓名"
          rules={[{ required: true, message: '请输入学生姓名' }]}
        >
          <Input placeholder="请输入学生姓名" />
        </Form.Item>

        <Form.Item
          name="stu_age"
          label="年龄"
          rules={[{ required: true, message: '请输入学生年龄' }]}
        >
          <InputNumber 
            min={5} 
            max={100} 
            placeholder="请输入学生年龄" 
            style={{ width: '100%' }} 
          />
        </Form.Item>

        <Form.Item
          name="stu_sex"
          label="性别"
          rules={[{ required: true, message: '请选择学生性别' }]}
        >
          <Select placeholder="请选择学生性别">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="stu_address"
          label="地址"
          rules={[{ required: true, message: '请输入学生地址' }]}
        >
          <Input placeholder="请输入学生地址" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            {submitText}
          </Button>
          {onCancel && (
            <Button onClick={handleCancel}>取消</Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default StudentForm;