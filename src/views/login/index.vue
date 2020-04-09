<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <h2>会员管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过逻辑
          this.$store.dispatch("Login", this.form).then(response => {
            if (response.flag) {
              // 前往首页,通过拦截器统一处理
              this.$router.push("/");
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
          // login(this.form.username, this.form.password).then(response => {
          //   const resp = response.data;
          //   if (resp.flag) {
          //     // 成功获取token
          //     // console.log(resp.data.token);
          //     getUserInfo(resp.data.token).then(response => {
          //       const respUser = response.data;
          //       if (respUser.flag) {
          //         localStorage.setItem("mms-user", JSON.stringify(respUser.data))
          //         localStorage.setItem("mms-token", resp.data.token)
          //         this.$router.push('/')
          //       } else {
          //         this.$message({
          //           message: respUser.message,
          //           type: "warning"
          //         });
          //       }
          //     });
          //   } else {
          //     this.$message({
          //       message: resp.message,
          //       type: "warning"
          //     });
          //   }
          // });
        } else {
          console.log("未验证通过!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login-form {
  width: 350px;
  margin: 150px auto;
  background: blanchedalmond;
  padding: 25px;
  border-radius: 20px;
}
.login-form h2 {
  text-align: center;
}
</style>
