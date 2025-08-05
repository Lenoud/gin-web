import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined, LoginOutlined , UserAddOutlined } from '@ant-design/icons'; // 用 LoginOutlined 更合适
import Home from './pages/Home';
import StudentManage from './pages/StudentManage';
import Login from "./pages/Login";
import Register from "./pages/Register";

const { Header, Content, Footer } = Layout;

const items = [
  {
    label: <Link to="/">首页</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/login">登录页面</Link>,
    key: 'login',
    icon: <LoginOutlined />,
  },
  {
    label: <Link to="/register">注册页面</Link>,
    key: 'register',
    icon: <UserAddOutlined  />,
  },
  {
    label: <Link to="/students">学生管理</Link>,
    key: 'students',
    icon: <BookOutlined />,
  },
];

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
            items={items}  // 这里改成用 items 属性
          />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, marginTop: 32 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<StudentManage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
