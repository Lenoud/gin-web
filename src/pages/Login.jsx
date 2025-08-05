// src/pages/Login.jsx
import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await login(values);
      // 打印登录成功后接收到的数据
      console.log(res)
      if (res.code === 200) {
        message.success(res.message || "登录成功");

        // 只有登录成功才存储和跳转
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate('/students');
      } else {
        message.error(res.message || "登录失败，请检查用户名和密码");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "服务器异常，请稍后再试");
      console.error("登录失败:", error);
    }
  };

  return (
    <Form name="login" onFinish={onFinish} autoComplete="off">
      <Form.Item 
        label="账号" 
        name="username" 
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="密码" 
        name="password" 
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          登录
        </Button>
        <Button type="default" onClick={() => navigate('/register')}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
