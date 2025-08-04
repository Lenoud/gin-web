// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // 官方推荐规则
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn", // 变量声明未使用时警告
      "no-undef": "error",      // 禁止使用未定义变量
    },
  },
];
