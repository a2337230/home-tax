<template>
    <div class="complain">
      <h1 class="complain-title">{{complainTitle}}</h1>
      <div class="complain-container">
        <div class="complain-container-title">
          <el-form :model="complainData" status-icon :rules="rules" size="small" ref="complainData" label-width="100px" class="demo-ruleForm">
            <el-form-item label=" 标 题 : " prop="title">
              <el-input type="text" v-model="complainData.title" autocomplete="off"></el-input>
            </el-form-item>
            <div class="complain-user">
              <el-form-item label=" 投诉人 : " prop="plain">
                <el-input type="text" v-model="complainData.plain" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label=" 被投诉人 : " prop="accused">
                <el-input type="text" v-model="complainData.accused" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label=" 严重程度 : " prop="rate">
                <el-rate
                  v-model="complainData.rate"
                  class="rate-center"
                  width="200"
                  :colors="['#99A9BF', '#F7BA2A', '#D2691E']"
                >
                </el-rate>
              </el-form-item>
              <el-form-item label=" 上报领导 : " prop="lead">
                <el-select v-model="complainData.lead" placeholder="请选择上报领导">
                  <el-option
                    v-for="item in options"
                    :key="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div ref="editor" style="text-align:left"></div>
      <div class="submit-btn">
        <el-button type="primary" v-on:click="getContent('complainData')">提交</el-button>
      </div>
    </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    props: {
      complainTitle: String
    },
    data () {
      return {
        complainData: {
          editorContent: '',
          title: "", // 标题
          plain: "", // 投诉人
          accused: "", // 被投诉人
          rate: null,
          lead: "",
          submitter: this.$store.getters.userInfo.name,
          type: this.complainTitle
        },
        options:[],
        rules: {
          title: [
             {
              required: true,
              message: "标题不能为空",
              trigger: "blur"
            },
          ],
          plain: [
             {
              required: true,
              message: "投诉人不能为空",
              trigger: "blur"
            },
          ],
          accused: [
             {
              required: true,
              message: "被投诉人不能为空",
              trigger: "blur"
            },
          ],
          rate: [
             {
              required: true,
            },
          ],
          lead: [
             {
              required: true,
              message: "请选择上报领导",
              trigger: "blur"
            },
          ]
        },
        editor : Object
      }
    },
    created () {
      this.getLead()
    },
    methods: {
      getLead () {
        this.$axios.get('http://www.tansuowu.com:3000/api/comUser')
        .then(res => {
          console.log(res.data.message)
          this.options = res.data.message
          // console.log(this.options)
        })
      },
      getContent (formName) {
        this.$refs[formName].validate((valid) => {
          if (!this.complainData.rate) {
            this.$message({
              message: '请选择影响程度',
              type: 'error',
            })
            return;
          }
          
          this.$axios.post('http://www.tansuowu.com:3000/api/complain', this.complainData)
          .then(res => {
            if (res.data.success === 200) {
              this.$message({
                message: res.data.message,
                type: 'success',
              })
              console.log(this.complainData)
              this.complainData.title = '';
              this.complainData.plain = '';
              this.complainData.accused = '';
              this.complainData.rate = null;
              this.complainData.lead = '';
              this.editor.txt.clear()
            }
          })
        })
      }
    },
    mounted() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.onchange = (html) => {
        this.complainData.editorContent = html;
      }
      this.editor.create()
    }
  }
</script>

<style lang="less" scoped>
.complain {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .complain-title {
    font-size: 18px;
    text-align: center;
    font-weight: normal;
  }
  .complain-container {
    margin-top: 15px;
    .complain-user {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.rate-center {
  display: flex;
  height: 30px;
  align-items: center;
  
}
.submit-btn {
  margin-top: 10px;
  text-align: center;
}
</style>
