import request from '../utils/request';
import API from './urls';

export const bindUserStudent = (user_id, student_id) => request.post(API.BIND_USER_STUDENT, { user_id, student_id });

export const unbindUserStudent = (userId) => request.delete(API.UNBIND_USER_STUDENT(userId));

// 获取用户列表
export const getUsers = () => request.get(API.USERS);