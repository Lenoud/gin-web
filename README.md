
# Student Management

基于 React + Vite + Ant Design 的学生管理系统前端项目。


## 项目结构

```

.
├── bak/                    # 备份文件
├── index.html              # 入口 HTML 文件
├── node_modules/           # 依赖包
├── public/                 # 公共资源
├── src/                    # 源代码目录
│   ├── api/                # 后端接口调用封装
│   │   └── student.js
│   ├── components/         # 组件目录
│   │   ├── StudentForm.jsx
│   │   └── StudentList.jsx
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx
│   │   └── StudentManage.jsx
│   ├── utils/              # 工具函数
│   │   └── request.js
│   ├── App.jsx             # 入口组件
│   └── main.jsx            # 项目入口
├── package.json            # 项目依赖和脚本配置
├── pnpm-lock.yaml          # 依赖锁定文件
├── vite.config.js          # Vite 配置
└── README.md               # 项目说明（你当前文件）

````

---

## 运行环境要求
- nvm 0.40.3 (可选)
- Node.js == v22.17.1
- pnpm 包管理器
- 支持现代浏览器

---

## 快速启动

1. 安装依赖：

```bash
pnpm install
````

2. 启动开发服务器：

```bash
pnpm run dev
```

3. 打开浏览器访问：[http://localhost:5173](http://localhost:5173) （默认端口）

---

## 主要功能

* 学生信息的增删改查
* 学生成绩管理
* 表单校验与交互
* 与后端 API 通信

---

## 技术栈

* React 18
* Vite 构建工具
* Ant Design 5 UI 组件库
* Axios 进行请求封装
* React Router 进行页面路由管理

---

## 目录说明

* `src/api/`：封装了对后端学生管理相关接口的调用
* `src/components/`：通用或独立的功能组件
* `src/pages/`：具体页面视图组件
* `src/utils/request.js`：Axios 配置和请求拦截器
* `vite.config.js`：Vite 的配置文件，包含插件和别名配置

---

## 代码规范与格式化

* 使用 ESLint 进行代码规范检查
* 采用 Prettier 进行代码格式化

