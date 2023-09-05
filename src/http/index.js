import axios from 'axios';
// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000, // 设置请求超时时间
});

// 拦截请求，设置请求头等信息
instance.interceptors.request.use(
    (config) => {
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 拦截响应，处理返回结果
instance.interceptors.response.use(
  (response) => {
    // 处理响应结果 
    return response.data;
  },
  (error) => {
    // 处理响应错误
    // 设置 loading 状态为 false
    return Promise.reject(error);
  }
);

// 导出封装后的请求方法
export default {
  get(url, params = {}) {
    return instance.get(url, {params});
  },
  post(url, data = {}) {
    return instance.post(url, data);
  },
};
