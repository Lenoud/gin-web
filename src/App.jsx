import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import StudentManage from './pages/StudentManage';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" style={{ float: 'left', color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            学生信息管理系统
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="students" icon={<BookOutlined />}>
              <Link to="/students">学生管理</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, marginTop: 32 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<StudentManage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          学生信息管理系统 ©{new Date().getFullYear()} Created with React & Gin
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;