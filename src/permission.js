/*
  权限校验
*/

import router from "./router";
import { getUserInfo } from "@/api/login";
import store from "@/store";

// 路由之前校验token
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem("mms-token");
  // 如果在非vue组件中引用store，需要手动引入store对象
  const token = store.state.user.token;
  // 如果token不存在
  if (!token) {
    if (to.path !== "/login") {
      // 如果目标不是/login,则跳转/login
      next({ path: "/login" });
    } else {
      // 如果目标是login,则直接放行
      next();
    }
  } else {
    //如果token存在
    if (to.path === "/login") {
      // 目标是login直接放行
      next();
    } else {
      // 获取用户信息
      // const user = localStorage.getItem("mms-user");
      const user = store.state.user.user
      console.log('user', user)
      if (user) {
        // 如果用户存在,token也存在,直接放行
        next();
      } else {
        // 如果用户不存在,则根据token取用户
        store.dispatch("GetUserInfo")
          .then((response) => {
            if (response.flag) {
              next();
            } else {
              next({ path: "/login" });
            }
          })
          .catch((error) => {});
        // getUserInfo(token).then(response => {
        //   const resp = response.data;
        //   if (resp.flag) {
        //     localStorage.setItem("mms-user", JSON.stringify(resp.data)); // 保存用户并放行
        //     next();
        //   } else {
        //     // 根据token获取用户失败，表示token过期,重新登录
        //     next({ path: "/login" });
        //     console.log("token过期，重新登录");
        //   }
        // });
      }
    }
  }
});
