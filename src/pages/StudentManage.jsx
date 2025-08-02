import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../api/student';

const StudentManage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // 获取学生列表
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      // 关键：确认 response.data.list 是否存在
      setStudents(response.data.list || []); 
    } catch (error) {
      console.error('获取学生列表失败:', error);
      message.error('获取学生列表失败');
    } finally {
      setLoading(false);
    }
  };
  // 初始加载
  useEffect(() => {
    fetchStudents();
  }, []);

  // 处理添加学生
  const handleAddStudent = async (values) => {
    try {
      setLoading(true);
      await addStudent(values);
      message.success('添加学生成功');
      fetchStudents(); // 重新获取列表
    } catch (error) {
      console.error('添加学生失败:', error);
      message.error('添加学生失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理更新学生
  const handleUpdateStudent = async (values) => {
    if (!editingStudent || !editingStudent.id) return;

    try {
      setLoading(true);
      await updateStudent(editingStudent.id, values);
      message.success('更新学生成功');
      setEditingStudent(null);
      fetchStudents(); // 重新获取列表
    } catch (error) {
      console.error('更新学生失败:', error);
      message.error('更新学生失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理删除学生
  const handleDeleteStudent = async (id) => {
    try {
      setLoading(true);
      await deleteStudent(id);
      message.success('删除学生成功');
      fetchStudents(); // 重新获取列表
    } catch (error) {
      console.error('删除学生失败:', error);
      message.error('删除学生失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理编辑
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="学生信息管理系统" bordered={false}>
        {editingStudent ? (
          <StudentForm
            initialValues={editingStudent}
            onFinish={handleUpdateStudent}
            title="编辑学生信息"
            submitText="更新"
            onCancel={handleCancelEdit}
          />
        ) : (
          <StudentForm
            onFinish={handleAddStudent}
            title="添加新学生"
            submitText="添加"
          />
        )}

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDeleteStudent}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default StudentManage;