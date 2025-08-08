// App.jsx - 项目主入口，负责路由和整体布局
// 这里定义了页面路由和顶部导航菜单，所有页面都在此注册
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined, LoginOutlined , UserAddOutlined } from '@ant-design/icons';
import { Home, StudentManage, Login, Register, ScoreManage ,UserManage } from './pages';
import './styles/App.css';   // 引入样式


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
  {
    label: <Link to="/users">用户管理</Link>,
    key: 'users',
    icon: <BookOutlined />,
  },
];

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header className="header">
          <div className="logo">学生信息管理系统</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={items}
          />
        </Header>
        <Content className="content">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/students" element={<StudentManage />} />
              <Route path="/scores/:id" element={<ScoreManage />} />
              <Route path="/users" element={<UserManage />} />
            </Routes>
          </div>
        </Content>
        <Footer className="footer">
          学生信息管理系统 ©{new Date().getFullYear()} Created with React & Gin
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
