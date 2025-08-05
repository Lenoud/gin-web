import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined, LoginOutlined , UserAddOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import StudentManage from './pages/StudentManage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScoreManage from "./pages/ScoreManage";
import './App.css';   // 引入样式


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
              <Route path="/students" element={<StudentManage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/scores/:id" element={<ScoreManage />} />
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
