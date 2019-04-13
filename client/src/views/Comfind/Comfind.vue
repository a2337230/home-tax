<template>
  <div class="comfind">
    <h1 class="comfind-title">{{comTitle}}</h1>
    <nav class="nav">
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
      <div class="post" @click="findtype = '2',name=''" style="margin: 0 20px">
        <el-radio v-model="findtype" label="2">状态查询</el-radio>
        <el-select @change="userSearch" v-model="value" size="small" style="width: 150px;padding-bottom: 17px;" placeholder="请选择阅读状态">
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
    </nav>

    <el-table
      :data="comData"
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
        prop="title"
        label="标题"
        align="center"
        width="400">
      </el-table-column>
      <el-table-column
        prop="plain"
        label="投诉人"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="accused"
        label="被投诉人"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="rate"
        align="center"
        label="影响程度"
        width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.rate | ComRate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="submitter"
        align="center"
        label="提交人">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150">
        <template slot-scope="scope">
          <router-link target="_blank" :to="{path:(url + scope.row.id)}">
            <el-button type="text" size="small">查看详情</el-button>
          </router-link>
          <el-button @click="delCom(scope.row)" type="text" size="small" style="margin-left: 20px">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'comfind',
  props: {
    url: String,
    comTitle: String
  },
  data () {
    return {
      findtype: '1',
      name: '',
      value: '',
      options: ['已阅读','未阅读'],
      allComData: [],
      comData: [],
      filterData: [],
    }
  },
  created () {
    this.getUser();
  },
  methods: {
    getUser () {
      this.$axios.get('http://www.tansuowu.com:3000/api/allComplain')
      .then(res => {
        this.allComData = res.data.message;
        this.filterData = this.allComData.filter(item => item.type === this.comTitle + '上报');
        this.comData = this.filterData;
      })
    },
    delCom (data) {
      let ComData = {
        id: data.id
      }
      this.$axios.post('http://www.tansuowu.com:3000/api/delCom', ComData)
      .then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.getUser();
      })
    },
    userSearch () {

    }
  },
  filters: {
    ComRate (rate) {
      let rateTitle = "";
      if (rate === '1') {
        rateTitle = "极轻微"
      } else if (rate === 2) {
        rateTitle = "轻微"
      } else if (rate === 3) {
        rateTitle = "中等"
      } else if (rate === 4) {
        rateTitle = "重大"
      } else if (rate === 5) {
        rateTitle = "非常重大"
      }
      return rateTitle
    }
  }
}
</script>
<style lang="less" scoped>
.comfind {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .comfind-title {
    font-size: 18px;
    text-align: center;
    font-weight: normal;
  }
  .nav {
    margin-top: 20px;
    width: 840px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
}
</style>
