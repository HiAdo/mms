import axios from "@/utils/request";

export function login(username, password) {
  return axios({
    method: "post",
    url: "/user/login",
    data: {
      username,
      password
    }
  });
}

export function getUserInfo(token) {
  return axios({
    method: "get",
    url: `/user/info/${token}`
  });
}

export function logout(token) {
  return axios({
    method: "post",
    url: `/user/logout`,
    data: {
      token
    }
  });
}