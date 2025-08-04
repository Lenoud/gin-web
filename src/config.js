let config = {};

export async function loadConfig() {
  const res = await fetch("/config.json"); // 注意这里一定要用 / 开头
  config = await res.json();
  console.log("加载到配置：", config); // 验证用
}

export function getConfig() {
  return config;
}
