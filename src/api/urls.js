// src/api/urls.js
const API = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/register",
  USERS: '/api/users',

  // 学生
  STUDENTS: "/api/students",
  ADD_STUDENT: "/api/students",
  UPDATE_STUDENT: (id) => `/api/students/${id}`,
  DELETE_STUDENT: (id) => `/api/students/${id}`,

  // 成绩（挂在学生下面）
  SCORES: (studentId) => `/api/students/${studentId}/scores`, // GET 获取成绩列表
  ADD_SCORES: (studentId) => `/api/students/${studentId}/scores`, // POST 添加成绩

  UPDATE_SCORES: (scoreId) => `/api/scores/${scoreId}`, // PUT 更新成绩
  DELETE_SCORES: (scoreId) => `/api/scores/${scoreId}`, // DELETE 删除成绩

  BIND_USER_STUDENT: '/api/user_students/bind',
  UNBIND_USER_STUDENT: (userId) => `/api/user_students/unbind/${userId}`,  // 解绑接口带参数
};

export default API;
