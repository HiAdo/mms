<template>
  <div class="header">
    <a href="#/" class="logo">会员管理系统</a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width: 400px;"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { logout } from "@/api/login";
import passwordApi from "@/api/password";
export default {
  data() {
    //校验原密码
    const validateOldPass = (rule, value, callback) => {
      // alert(this.user.id)
      passwordApi.checkPwd(this.user.id, value).then(response => {
        const resp = response.data;
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    };
    // rule 当前校验表单对象
    const validatePass = (rule, value, callback) => {
      if (value != this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // user 获取用户信息
      // user: JSON.parse(localStorage.getItem("mms-user")),
      user: this.$store.state.user.user,
      dialogFormVisible: false,
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        pass: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          // 修改密码
          this.handlePwd();
          break;
        case "b":
          this.handleExit();
          break;
        default:
          break;
      }
    },
    handleExit() {
      this.$store.dispatch("Logout").then(response => {
        if (response.flag) {
          // 退出成功
          // 回到登录页面
          this.$router.push("/login");
        } else {
          this.$message({
            message: resp.message,
            type: "warning",
            duration: 500 // 弹出停留时间
          });
        }
      });
      // 退出登录
      // logout(localStorage.getItem("mms-token")).then(response => {
      //   const resp = response.data;
      //   if (resp.flag) {
      //     localStorage.removeItem("mms-token");
      //     localStorage.removeItem("mms-user");
      //     this.$router.push("/login");
      //     this.$message({
      //       message: resp.message,
      //       type: "success"
      //     });
      //   } else {
      //     this.$message({
      //       message: resp.message,
      //       type: "warning"
      //     });
      //   }
      // });
    },
    handlePwd() {
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加
          passwordApi
            .updatePwd(this.user.id, this.ruleForm.checkPass)
            .then(response => {
              const resp = response.data;
              this.$message({
                message: resp.message,
                type: resp.flag ? "success" : "warning"
              });
              if (resp.flag) {
                // 修改成功, 清除本地数据, 重新登录
                this.handleLogout();
                // 关闭窗口
                this.dialogFormVisible = false;
              }
            });
        } else {
          // 验证不通过
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #2d3a4b;
}
.logo {
  color: white;
  margin: 0 auto;
  padding: 40px;
  text-decoration: none;
}
.el-dropdown {
  color: white;
  cursor: pointer;
  float: right;
  padding-right: 40px;
}
</style>
