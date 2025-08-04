import React, { useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { register } from "../api/auth";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await register(values);
      message.success(res.message || "注册成功");
    } catch (err) {
      message.error(err.response?.data?.error || "注册失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>用户注册</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="is_admin" valuePropName="checked">
          <Checkbox>是否管理员</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
