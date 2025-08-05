import axios from 'axios';
import { message } from 'antd';
import { getConfig } from "../config";

// 创建 axios 实例
const request = axios.create({
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    config.baseURL = getConfig().API_BASE;

    // ✅ 每次请求带上 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      message.error("登录已过期，请重新登录");

      // ✅ 删除 token 并跳转到登录页
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      message.error(error.response?.data?.message || "网络错误");
    }
    return Promise.reject(error);
  }
);

export default request;
