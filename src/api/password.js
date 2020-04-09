import axios from "@/utils/request";

export default {
  // 校验密码是否正确
  checkPwd(userId, password) {
    return axios({
      url: "/user/pwd",
      method: "post",
      data: {
        userId,
        password,
      },
    });
  },
  
  // 修改密码
  updatePwd(userId, password) {
    return axios({
      url: "/user/pwd",
      method: "put",
      data: {
        userId,
        password,
      },
    });
  },
};
