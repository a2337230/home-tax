<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../common/logo.png" alt="logo" class="logo">
        <span class="title">房产交易管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" alt="用户头像" class="avatar">
          <div class="welcome">
            <p class="comename">欢迎</p>
            <p class="avatarname" v-text="user.name"></p>
          </div>
          <el-dropdown @command="setDialogInfo" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link tag="div" to="/userinfo">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'header-nav',
  computed: {
    user () {
      return this.$store.getters.userInfo 
    }
  },
  methods: {
    setDialogInfo (item) {
      switch(item) {
        case "info":
          this.showInfoList();
          break;
        case "loginout":
          this.loginout();
          break;
      }
    },
    showInfoList () {
      this.$router.push('/userinfo')
    },
    loginout () {
      // 清除local
      localStorage.removeItem('userInfo')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    }
    

  }
}

</script>
<style lang="less" scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  overflow: hidden;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
  padding: 0 10px;
  .logo {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 5px;
  }
}
.user {
  padding-top: 10px;
  text-align: right;
  padding-right: 10px;
  float: right;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome {
    width: auto;
    padding: 0 5px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    .comename {
      line-height: 20px;
      font-size: 14px;
    }
    .avatarname {
      color: #409eff;
    }
  }
  .el-dropdown {
    color: #fff;
  }
}
</style>
