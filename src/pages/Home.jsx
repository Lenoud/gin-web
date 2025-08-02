import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Card bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
        <Title level={2}>欢迎使用学生信息管理系统</Title>
        <Paragraph style={{ fontSize: 16, margin: '20px 0' }}>
          这是一个基于 React 和 Gin 框架开发的学生信息管理系统，
          可以帮助您轻松管理学生的基本信息，包括添加、查询、更新和删除学生信息。
        </Paragraph>
        <Space size="large">
            <Link to="/students">  {/* 直接用 Link 包裹按钮 */}
              <Button 
                type="primary" 
                size="large" 
                icon={<BookOutlined />}>
                进入学生管理
              </Button>
            </Link>
          </Space>
      </Card>
    </div>
  );
};

export default Home;