import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // 配置代理（已注释掉，不生效）
    /*
    proxy: {
      // 匹配所有以 '/api' 开头的请求
      '/api': {
        // 后端接口的基础地址（替换为你的实际后端地址）
        target: 'http://192.168.100.153:38080',
        // 允许跨域
        changeOrigin: true,
      },
    },
    */
  },
})
