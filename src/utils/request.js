import axios from "axios";
import { Loading, Message } from "element-ui";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000, // 请求超时 5000ms
});

// 全局加载器
const loading = {
  loadingInstance: null,
  open: function() {
    // 单例模式，防止频繁请求创建过多实例
    if (this.loadingInstance === null) {
      console.log("创建实例");
      this.loadingInstance = Loading.service({
        target: ".main", // 在 main 区域中显示加载器
        text: "板命加载中...",
        background: "rgba(0, 0, 0, 0.5",
      });
    }
  },
  close: function() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
};

request.interceptors.request.use(
  (config) => {
    // 请求拦截
    // console.log(process.env.VUE_APP_BASE_API);
    loading.open();
    return config;
  },
  (error) => {
    loading.close();
    // 异常
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // 响应拦截
    loading.close();
    const resp = response.data;
    // 如果后台响应状态码不是 2000 , 说明后台服务有异常,统一可在此处处理
    if (resp.code !== 2000) {
      Message({
        message: res.message || "系统异常",
        type: "warning",
        duration: 5 * 1000, // 停留时长
      });
    }
    return response;
  },
  (error) => {
    loading.close();
    // 当请求接口出错时, 进行弹出错误提示, 如 404, 500, 请求超时
    console.log("response error", error.response.status);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    // 异常
    return Promise.reject(error);
  }
);

export default request; // 导出自定义创建的 axios 对象
