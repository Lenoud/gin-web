import axios from 'axios';
import { message } from 'antd';
import { getConfig } from "../config/config";

// 技术错误处理（如 401）
export function handleError(error) {
  if (error.response && error.response.status === 401) {
    message.error("登录已过期，请重新登录");
    localStorage.removeItem("token");
    window.location.href = "/login";
  } else {
    message.error(error.response?.data?.message || "网络错误");
  }
}

// 业务/技术错误统一处理（推荐复用）
export function handleRequestError(error, fallbackMsg = "操作失败，请稍后再试") {
  if (error?.response?.status === 401) {
    handleError(error);
  } else {
    message.error(error?.response?.data?.message || fallbackMsg);
    // 可选：console.error(fallbackMsg, error);
  }
}

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
  (response) => {
    const res = response.data;
    console.log("响应数据:", res); // 打印后端返回的完整数据

    // 业务错误统一处理，不抛异常
    if (res.code && res.code !== 200) {
      // 只弹出错误提示，不抛异常
      return {
        success: false,
        message: res.message || "请求失败",
        code: res.code,
        data: res.data || null
      };
    }

    // 成功返回统一结构
    return {
      success: true,
      message: res.message || "",
      code: res.code,
      data: res.data
    };
  },
  (error) => {
    handleRequestError(error);
    // 技术错误仍抛异常
    return Promise.reject(error);
  }
);

export default request;
