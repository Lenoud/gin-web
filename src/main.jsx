import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 导入中文语言包

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}> {/* 配置 Ant Design 使用中文 */}
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);