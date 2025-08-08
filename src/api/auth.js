// src/api/auth.js

// 登录接口：POST /api/auth/login
// 参数：{ username, password }
// 返回：{ success, message, data: { token, user } }
import request from '../utils/request';
import API from './urls';

export const login = (data) => request.post(API.LOGIN, data);

// 注册接口：POST /api/register
// 参数：{ username, password, ... }
// 返回：{ success, message, data: { user } }
export const register = (data) => request.post(API.REGISTER, data);