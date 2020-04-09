import { login, getUserInfo, logout } from "@/api/login";
import {
  getToken,
  setToken,
  setUser,
  getUser,
  removeToken,
} from "@/utils/auth";

const user = {
  state: {
    token: getToken(), // 从本地获取token作为state的初始值
    user: getUser(),
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USER(state, user) {
      state.user = user;
      setUser(user);
    },
  },

  actions: {
    // 登录
    Login({ commit }, form) {
      // 提交表单给后台进行验证是否正确
      // resolve 触发成功处理，reject 触发异常处理
      return new Promise((resolve, reject) => {
        login(form.username.trim(), form.password)
          .then((response) => {
            const resp = response.data;
            commit("SET_TOKEN", resp.data.token);
            resolve(resp);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 通过token获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((response) => {
            const respUser = response.data;
            commit("SET_USER", respUser.data);
            resolve(respUser);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then((response) => {
            const resp = response.data;
            commit("SET_TOKEN", "");
            commit("SET_USER", null);
            removeToken();
            resolve(resp);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
