import axios from "@/utils/request";

export default {
  // page当前页码, size 每页显示条数, searchMap 条件
  search(page, size, searchMap) {
    return axios({
      url: `/staff/list/search/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  },

  // 添加会员
  add(pojo) {
    return axios({
      url: `/staff`,
      method: "post",
      data: pojo
    });
  },

  // 查找会员
  getById(id) {
    return axios({
      url: `/staff/${id}`,
      method: "get"
    });
  },

  // 修改会员
  update(pojo) {
    return axios({
      url: `/staff/${pojo.id}`,
      method: "put",
      data: pojo
    });
  },

  deleteById(id) {
    return axios({
      url: `/staff/${id}`, // 反单引号 ``
      method: "delete" // delete 方式提交
    });
  }
};