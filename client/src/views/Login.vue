<template>
  <div class="login">
    <section class="form_container">
      <h1>房产交易台账系统</h1>
      <el-form :model="loginUser" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="loginUser.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" placeholder="请输入密码" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" @click="submitForm('loginForm')">员工登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "login",
  data () {
    return {
      loginUser: {
        user: "",
        password: ""
      },
      rules: {
        user: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min:4,
            max:12,
            message:"长度在6-12位之间",
            trigger:"blur"
          }
        ],
        password: [
          {
            required:true,
            message:"密码不能为空",
            trigger:"blur"
          },
          {
            min:5,
            max:30,
            message:"长度在5-30位之间",
            trigger:"blur"
          }
        ]
      }
    };
  },
  created () {
    localStorage.removeItem("userInfo")
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://www.tansuowu.com:3000/api/loginUser', this.loginUser)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                })
                let userInfo = JSON.stringify(res.data.message)
                localStorage.setItem("userInfo", userInfo)
                this.$store.dispatch("setUserInfo", res.data.message)
                this.$router.push('/')
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '您的用户名或密码格式不正确',
            type: 'error'
          })
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("./../common/bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form_container {
    width: 300px;
    padding: 50px;
    background-color: rgba(255,255,255,0.5);
    border-radius: 10px;
    // height: 200px;
    text-align: center;
    .login_btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
