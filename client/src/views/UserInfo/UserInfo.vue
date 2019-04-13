<template>
  <div class="user-info">
    <h1 class="user-title">个人信息</h1>
    <div class="user-container">
      <div class="user-left">
        <div class="avatar">
          <img :src="user.avatar?user.avatar:'./../common/avatar.jpg'" alt="">
        </div>
        <div class="avatar-btn">
          <el-button type="primary" round @click="show = true">更换头像</el-button>
        </div>
      </div>
      <div class="user-right">
        <div>
          <ul class="user-info-list">
            <li>
              <p>
                <span>用户名</span> : {{user.user}}
              </p>
            </li>
            <li>
              <p>
                <span>姓  名</span> : {{user.name}}
              </p>
            </li>
            <li>
              <p>
                <span>性  别</span> : {{user.sex}}
              </p>
            </li>
            <li>
              <p>
                <span>电  话</span> : {{user.tel}}
              </p>
            </li>
             <li>
              <p>
                <span>邮  箱</span> : {{user.email}}
              </p>
            </li>
             <li>
              <p>
                <span>生  日</span> : {{user.birthday}}
              </p>
            </li>
            <li>
              <p>
                <span>职  位</span> : {{user.post}}
              </p>
            </li>
          </ul>
        </div>
        <div class="user-info-btn">
          <el-button type="primary" round @click="openDialog">更改信息</el-button>
        </div>
      </div>
    </div>
    <!-- 修改头像 -->
    <my-upload field="img" @crop-success="cropSuccess" v-model="show" :width="100" :height="100" img-format="png"></my-upload>
    <el-dialog title="个人信息修改" :visible.sync="dialogTableVisible">
      <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          size="small"
          label-width="100px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="职位 : ">
            <el-input type="text" v-model="formData.post" disabled></el-input>
          </el-form-item>
          <el-form-item prop="user" label="用户名 : " v-if="formData.post !== '超级管理员'">
            <el-input type="text" v-model="formData.user"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名:">
            <el-input type="text" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱:">
            <el-input type="email" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="手机号:">
            <el-input type="tel" v-model="formData.tel"></el-input>
          </el-form-item>
          <el-form-item label="选择性别">
            <el-radio v-model="formData.sex" label="男" border size="medium" class="sex-box">男</el-radio>
            <el-radio v-model="formData.sex" label="女" border size="medium" class="sex-box">女</el-radio>
            <el-radio v-model="formData.sex" label="保密" border size="medium" class="sex-box">保密</el-radio>
          </el-form-item>
          <el-form-item label="生日">
            <el-col>
              <el-form-item prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="formData.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <div class="form-btn">
            <el-button @click="dialogTableVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload';
export default {
  name: 'userinfo',
  data () {
    return {
      avatar: "",
      show: false,
      dialogTableVisible: false,
      formData: {},
      form_rules: {
        name: [
          {
            required: true, //必填
            message: "用户名不能为空", //提示
            trigger: "blur" //失去焦点验证
          },
          {
            min: 2,
            max: 30,
            message: "长度要在2-8个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo 
    }
  },
  methods: {
    openDialog () {
      this.formData = JSON.parse(localStorage.getItem('userInfo'))
      this.dialogTableVisible = true;
    },
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是经过base64转码过的图片
      let data = {
        id: this.$store.getters.userInfo.id,
        avatar: imgDataUrl
      }
      this.$axios.post('http://www.tansuowu.com:3000/api/upload', data)
      .then(res => {
        this.$message({
          message: '头像修改成功',
          type: 'success',
        })
        let userInfo = JSON.stringify(res.data.message[0])
        localStorage.setItem("userInfo", userInfo)
        this.$store.dispatch("setUserInfo", res.data.message[0])
      })
      this.avatar = imgDataUrl;
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post('http://www.tansuowu.com:3000/api/edituser', this.formData)
          .then(res => {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.dialogTableVisible = false;
            let userInfo = JSON.stringify(this.formData)
            localStorage.setItem("userInfo", userInfo)
            this.$store.dispatch("setUserInfo", this.formData)
          })
        }
      })
    }
  },
  components: {
    myUpload
  }
}
</script>

<style lang="less" scoped>
.user-info{
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .user-title {
    text-align: center;
    font-weight: normal;
  }
  .user-container {
    display: flex;
    margin-top: 20px;
    align-items: center;
    .user-left {
      flex: 1;
      padding-top: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 300px;
        height: 300px;
        img {
          width: 300px;
          height: 300px;
          border-radius: 50%;
        }
      }
      .avatar-btn {
        padding: 20px 0;
      }
    }
    .user-right {
      flex: 1;
      padding-top: 55px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .user-info-list {
        min-width: 200px;
        font-size: 24px;
        line-height: 46px;
        font-family: "宋体";
        margin: 0 auto;
        li {
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
          }
        }
      }
      .user-info-btn {
        padding: 30px 0;
      }
    }
  }
}
.form-btn {
  display: flex;
  justify-content: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
