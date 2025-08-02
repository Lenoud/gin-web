import request from '../utils/request';

/**
 * 获取所有学生信息
 */
export const getStudents = () => {
  return request.get('/api/students');
};

/**
 * 添加学生
 * @param {Object} student 学生信息
 */
export const addStudent = (student) => {
  return request.post('/api/addstu', student);
};

/**
 * 更新学生信息
 * @param {number} id 学生ID
 * @param {Object} student 学生信息
 */
export const updateStudent = (id, student) => {
  return request.put(`/api/updatestu/${id}`, student);
};

/**
 * 删除学生
 * @param {number} id 学生ID
 */
export const deleteStudent = (id) => {
  return request.delete(`/api/delstu/${id}`);
};
    