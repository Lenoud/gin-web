import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BookOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 存用户信息

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    // console.log("所有 localStorage 数据：", localStorage);
    console.log('localStorage user:', userDataStr);
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        // console.log('解析后的用户:', userData.username);
        setUser(userData);
      } catch (error) {
        console.error('解析用户信息失败', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        {user ? (
          <Space>
            <UserOutlined />
            <span>{user.username}</span>
            <Button danger size="small" onClick={logout}>
              退出登录
            </Button>
          </Space>
        ) : (
          <span>未登录</span>
        )}
      </div>
      <Card style={{ maxWidth: 800, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          欢迎使用学生信息管理系统
        </Title>
        <Paragraph style={{ fontSize: 16, margin: '20px 0', textAlign: 'center' }}>
          这是一个基于 React 和 Gin 框架开发的学生信息管理系统，
          可以帮助您轻松管理学生的基本信息，包括添加、查询、更新和删除学生信息。
        </Paragraph>
        <Space style={{ display: 'flex', justifyContent: 'center' }} size="large">
          <Link to="/students">
            <Button type="primary" size="large" icon={<BookOutlined />}>
              进入学生管理
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
