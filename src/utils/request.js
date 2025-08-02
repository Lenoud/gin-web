import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证信息等
    return config;
  },
  (error) => {
    message.error('请求错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 如果后端返回错误状态码
    if (data.code && data.code !== 200 && data.code !== 0) {
      message.error(data.message || '操作失败');
      return Promise.reject(new Error(data.message || 'Error'));
    }
    
    return data;
  },
  (error) => {
    message.error('网络错误，请稍后重试');
    return Promise.reject(error);
  }
);

export default request;