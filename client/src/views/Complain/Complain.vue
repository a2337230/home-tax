<template>
  <div class="complain">
    <h1 class="complain-title">{{complainTitle}}</h1>
    <div class="complain-container">
      <div class="complain-container-title">
        <el-form :model="content" status-icon :rules="rules" size="small" ref="content" label-width="80px" class="demo-ruleForm">
          <el-form-item label=" 标 题 : " prop="title">
            <el-input type="text" v-model="content.title" autocomplete="off"></el-input>
          </el-form-item>
          <div class="complain-user">
            <el-form-item label=" 投诉人 : " prop="plain">
              <el-input type="text" v-model="content.plain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label=" 被投诉人 : " prop="accused">
              <el-input type="text" v-model="content.accused" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label=" 严重程度 : " prop="user">
              <el-rate
                v-model="content.rate"
                class="rate-center"
                width="200"
                :colors="['#99A9BF', '#F7BA2A', '#D2691E']"
                :texts="content.texts"
              >
              </el-rate>
            </el-form-item>
            <el-form-item label=" 上报领导 : " prop="accused">
              <el-input type="text" v-model="content.accused" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <editor></editor>
  </div>
</template>
<script>
import Editor from './../../components/Editor';
export default {
  name: 'complain',
  props: {
    complainTitle: String
  },
  data () {
    return {
      content: {
        title: "", // 标题
        plain: "", // 投诉人
        accused: "", // 被投诉人
        rate: ""
      }
    }
  },
  components: {
    Editor
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
.el-rate__icon {
  font-size: 24px !important;
}
</style>
