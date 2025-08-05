import React from 'react';
import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';  // ✅ 引入 useNavigate

const StudentList = ({
  students,
  onEdit,
  onDelete,
  loading,
}) => {
  const navigate = useNavigate(); // ✅ 获取 navigate

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'stu_name',
      key: 'stu_name',
    },
    {
      title: '年龄',
      dataIndex: 'stu_age',
      key: 'stu_age',
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'stu_sex',
      key: 'stu_sex',
      width: 80,
      render: (sex) => (
        <Tag color={sex === '男' ? 'blue' : 'pink'}>
          {sex}
        </Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'stu_address',
      key: 'stu_address',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个学生吗？"
            onConfirm={() => onDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
          <Button 
            type="link" 
            onClick={() => navigate(`/scores/${record.id}`)}
          >
            成绩
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={students.map(student => ({ ...student, key: student.id }))}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default StudentList;
