<template>
  <div class="dialog">
    <el-dialog
      :title="userdialog.title"
      :visible.sync="userdialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="false"
      align="center"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          size="small"
          label-width="100px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="职位:">
            <el-select v-model="formData.post" placeholder="请选择职位">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="user" label="用户名:">
            <el-input type="text" v-model="formData.user"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:" v-if="userdialog.option=='adduser'">
            <el-input type="text" v-model="formData.password"></el-input>
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
            <el-button @click="userdialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "userdialog",
  props: {
    userdialog: Object,
    formData: Object
  },
  data() {
    return {
      format_type_list: [
        "业务负责人",
        "票证负责人",
        "业务专员",
        "信访专员",
        "信访负责人"
      ],
      form_rules: {
        user: [
          {
            required: true, //必填
            message: "用户名不能为空", //提示
            trigger: "blur" //失去焦点验证
          },
          {
            min: 5,
            max: 12,
            message: "长度要在5-12个字符之间",
            trigger: "blur"
          }
        ],
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
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6-30位之间",
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
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post(`http://www.tansuowu.com:3000/api/${this.userdialog.option}`, this.formData).then(res => {
            //添加成功
            this.$message({
              message: res.data.message,
              type: "success"
            });
            //隐藏dialog
            this.userdialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.el-select {
  display: block;
  
}
.sex-box {
  width: 100px;
  text-align: center;
}
</style>

