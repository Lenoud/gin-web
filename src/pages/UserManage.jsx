import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Radio,
  Select,
} from 'antd';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { register, getUsers, bindUserStudent, getStudents } from '../api';

const { Option } = Select;

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 新增用户 modal 状态
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 绑定学生 modal 状态（弹窗）
  const [bindModalVisible, setBindModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // 表格行绑定选择状态，key=userId，value=studentId
  const [selectedStudents, setSelectedStudents] = useState({});
  const [bindingUserIds, setBindingUserIds] = useState(new Set()); // 绑定loading状态，支持多行同时绑定

  // 弹窗绑定相关
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [binding, setBinding] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res.code === 200 && res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        message.error(res.message || '获取用户列表失败');
      }
    } catch {
      message.error('请求用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await getStudents();
      if (res.code === 200 && res.data && Array.isArray(res.data.list)) {
        setStudents(res.data.list);
      } else {
        message.error('获取学生列表失败');
      }
    } catch {
      message.error('请求学生列表失败');
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadStudents();
  }, []);

  // 新增用户modal打开
  const openAddModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const res = await register(values);
      if (res.success || res.code === 200) {
        message.success('用户注册成功');
        setModalVisible(false);
        loadUsers();
      } else {
        message.error(res.message || '注册失败');
      }
    } catch {
      message.error('请求失败');
    }
  };

  // 弹窗绑定打开
  const openBindModal = (user) => {
    setSelectedUser(user);
    setSelectedStudentId(null);
    setBindModalVisible(true);
  };

  // 弹窗绑定确认
  const handleBind = async () => {
    if (!selectedStudentId) {
      message.warning('请选择学生');
      return;
    }
    setBinding(true);
    try {
      const res = await bindUserStudent(selectedUser.id, selectedStudentId);
      if (res.code === 200) {
        message.success('绑定成功');
        setBindModalVisible(false);
        loadUsers(); // 重新加载用户数据（如果绑定信息显示在用户列表）
      } else {
        message.error(res.message || '绑定失败');
      }
    } catch {
      message.error('绑定请求失败');
    } finally {
      setBinding(false);
    }
  };

  // 行内绑定学生选择改变
  const handleSelectChange = (userId, studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [userId]: studentId,
    }));
  };

  // 行内绑定按钮点击
  const handleInlineBind = async (userId) => {
    const studentId = selectedStudents[userId];
    if (!studentId) {
      message.warning('请选择学生');
      return;
    }
    setBindingUserIds((prev) => new Set(prev).add(userId));
    try {
      const res = await bindUserStudent(userId, studentId);
      if (res.code === 200) {
        message.success('绑定成功');
        // 绑定成功后清除选中
        setSelectedStudents((prev) => {
          const newSelected = { ...prev };
          delete newSelected[userId];
          return newSelected;
        });
        loadUsers();
      } else {
        message.error(res.message || '绑定失败');
      }
    } catch {
      message.error('绑定请求失败');
    } finally {
      setBindingUserIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 70 },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    {
      title: '绑定学生',
      key: 'bind_student',
      width: 220,
      render: (_, record) => (
        <Space>
          <Select
            placeholder="选择学生"
            style={{ width: 140 }}
            value={selectedStudents[record.id]}
            onChange={(val) => handleSelectChange(record.id, val)}
            loading={loadingStudents}
            allowClear
          >
            {students.map((student) => (
              <Option key={student.id} value={student.id}>
                {student.stu_name}（ID: {student.id}）
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            size="small"
            loading={bindingUserIds.has(record.id)}
            disabled={!selectedStudents[record.id]}
            onClick={() => handleInlineBind(record.id)}
          >
            绑定
          </Button>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button
            icon={<UserAddOutlined />}
            type="link"
            size="small"
            onClick={() => openBindModal(record)}
          >
            弹窗绑定
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>用户管理</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={openAddModal}
      >
        新增用户
      </Button>

      <Table
        columns={columns}
        dataSource={users.map((u) => ({ ...u, key: u.id }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* 新增用户 Modal */}
      <Modal
        title="新增用户"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱' },
            ]}
          >
            <Input placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 弹窗绑定学生 Modal */}
      <Modal
        title={`给用户 ${selectedUser?.username || ''} 绑定学生`}
        visible={bindModalVisible}
        onCancel={() => setBindModalVisible(false)}
        onOk={handleBind}
        okText="绑定"
        confirmLoading={binding}
        cancelText="取消"
      >
        <Radio.Group
          onChange={(e) => setSelectedStudentId(e.target.value)}
          value={selectedStudentId}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {loadingStudents ? (
              <div>加载中...</div>
            ) : (
              students.map((student) => (
                <Radio key={student.id} value={student.id}>
                  {student.stu_name} （ID: {student.id}）
                </Radio>
              ))
            )}
          </Space>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default UserManager;
