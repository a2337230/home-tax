<template>
  <section class="address-book">
    <h1 class="address-title">员工通讯录</h1>
    <nav class="nav">
      <div class="radio">
        <div class="name" @click="findtype = '1',value=''">
          <el-radio v-model="findtype" label="1">姓名查询</el-radio>
          <el-input
            v-model="name"
            placeholder="请输入员工姓名"
            size="small"
            style="width: 150px"
            @keydown.enter.native="userSearch"
          >
          </el-input>
        </div>
        <div class="post" @click="findtype = '2',name=''">
          <el-radio v-model="findtype" label="2">职位查询</el-radio>
          <el-select @change="userSearch" v-model="value" size="small" style="width: 150px" placeholder="请选择所属部门">
            <el-option
              v-for="item in options"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="user-btn">
          <el-button type="primary" size="small" @click="userSearch">查询</el-button>
        </div>
      </div>
      <div class="add-btn">
        <el-button v-if="user.post ==='超级管理员'" type="primary" size="small" @click="addUser()">添加员工</el-button>
      </div>
    </nav>
    <el-table
      :data="addressData"
      border
      size="small"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="user"
        v-if="user.post ==='超级管理员'"
        label="用户名"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tel"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="email"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="post"
        align="center"
        width="120"
        label="所属职位">
      </el-table-column>
      <el-table-column
        prop="birthday"
        align="center"
        label="出生年月日">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="user.post ==='超级管理员'"
        width="150">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <user-dialog :userdialog="userDialog" :formData="formData" @update="getUser"></user-dialog>
  </section>
</template>
<script>
import UserDialog from './UserDialog';
export default {
  name: 'addressbook',
  data () {
    return {
      findtype: "1",
      name: '',
      options: [
        '管理员',
        '业务负责人',
        '票证负责人',
        '业务专员',
        '信访专员',
        '信访负责人',
      ],
      value: '',
      alladdressData: [],
      addressData: [],
      userDialog: {
        show:false,
        title:"",
        option: 'edit'
      },
      formData: {
        name: "",
        email: "",
        identity: "员工",
        password:"",
        sex:"男",
        tel:"",
        birthday: "",
        id:'' 
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo 
    }
  },
  created () {
    this.getUser();
  },
  methods: {
    getUser () {
      this.$axios.get('http://www.tansuowu.com:3000/api/allUser')
      .then(res => {
        this.alladdressData = res.data.message;
        this.addressData = this.alladdressData;
      })
    },
    addUser () {
      this.formData = {
        user: "",
        password: "123456",
        name: "",
        email: "",
        post: "业务专员",
        id: "",
        sex:"男",
        tel:"" 
      }
      this.userDialog = {
        show:true,
        title:"添加人员信息",
        option: 'adduser'
      }
    },
    editUser (userInfo) {
      if (userInfo.id === 1) {
        this.$message({
          message: "超级管理员修改权限已被作者锁定，请尝试修改其他",
          type: "warning"
        });
        return
      }
      this.formData = userInfo;
      this.userDialog = {
        show:true,
        title:"修改人员信息",
        option: 'edituser'
      }
    },
    delUser (userInfo) {
      if (userInfo.id === 1) {
        this.$message({
          message: "超级管理员不允许删除",
          type: "warning"
        });
        return
      }
      let data = {
        id: userInfo.id
      }
      this.$axios.post('http://www.tansuowu.com:3000/api/deluser', data).then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.getUser();
      });
    },
    userSearch () {
      let userArr = [];
      if (!this.name && !this.value) {
        this.addressData = this.alladdressData;
        return;
      } else if (this.name) {
        userArr = this.alladdressData.filter(item => item.name.includes(this.name))
      } else {
        this.findtype = '2';
        userArr = this.alladdressData.filter(item => item.post.includes(this.value))
      }
      this.addressData = userArr;
    }
  },
  components: {
    UserDialog
  }
}
</script>
<style lang="less" scoped>
.address-book {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .address-title {
    text-align: center;
    font-weight: normal;
    font-size: 18px;
    line-height: 40px;
  }
  .nav {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .radio {
      width: 700px;
      display: flex;
      justify-content: space-around;
    }
    .user-btn {
      margin: 0 20px;
    }
  }
}
</style>
