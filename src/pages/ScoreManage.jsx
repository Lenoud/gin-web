import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Input, InputNumber, message, Popconfirm, Space, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { addScores, getScores, deleteScores, updateScores } from '../api/score';

const ScoreManage = () => {
  const { id } = useParams();  // 学生ID
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  // 编辑成绩
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScore, setEditingScore] = useState(null);

  const [form] = Form.useForm();

  const fetchScores = async () => {
    try {
      setLoading(true);
      const res = await getScores(id);
      setScores(res.data || []);
    } catch (error) {
      message.error("获取成绩失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, [id]);

  // 添加成绩
  const handleAddScore = async (values) => {
    try {
      await addScores(id, values);
      message.success("添加成绩成功");
      fetchScores();
    } catch (error) {
      message.error("添加成绩失败");
    }
  };

  // 删除成绩
  const handleDeleteScore = async (scoreId) => {
    try {
      await deleteScores(scoreId);
      message.success("删除成绩成功");
      fetchScores();
    } catch (error) {
      message.error("删除成绩失败");
    }
  };

  // 打开编辑弹窗
  const handleEditScore = (record) => {
    setEditingScore(record);
    form.setFieldsValue({
      subject: record.subject,
      score_value: record.score_value,
    });
    setIsModalOpen(true);
  };

  // 提交编辑成绩
  const handleUpdateScore = async () => {
    try {
      const values = await form.validateFields();
      await updateScores(editingScore.id, values);
      message.success("修改成绩成功");
      setIsModalOpen(false);
      setEditingScore(null);
      fetchScores();
    } catch (error) {
      message.error("修改成绩失败");
    }
  };

  const columns = [
    { title: '科目', dataIndex: 'subject', key: 'subject' },
    { title: '成绩', dataIndex: 'score_value', key: 'score_value' },
    { title: '时间', dataIndex: 'created_at', key: 'created_at' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEditScore(record)}>编辑</Button>
          <Popconfirm
            title="确定删除该成绩吗？"
            onConfirm={() => handleDeleteScore(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card title={`学生 ${id} 成绩管理`}>
        {/* 添加成绩表单 */}
        <Form layout="inline" onFinish={handleAddScore} style={{ marginBottom: 16 }}>
          <Form.Item name="subject" rules={[{ required: true, message: '请输入科目' }]}>
            <Input placeholder="科目" />
          </Form.Item>
          <Form.Item name="score_value" rules={[{ required: true, message: '请输入成绩' }]}>
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">添加成绩</Button>
          </Form.Item>
        </Form>

        {/* 成绩表格 */}
        <Table
          rowKey="id"
          dataSource={scores}
          columns={columns}
          loading={loading}
        />

        {/* 编辑成绩弹窗 */}
        <Modal
          title="修改成绩"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleUpdateScore}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="subject" label="科目" rules={[{ required: true, message: '请输入科目' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="score_value" label="成绩" rules={[{ required: true, message: '请输入成绩' }]}>
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default ScoreManage;
