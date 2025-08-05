// src/api/auth.js
import request from '../utils/request';
import API from './urls';

export const login = (data) => request.post(API.LOGIN, data);

export const register = (data) => request.post(API.REGISTER, data);