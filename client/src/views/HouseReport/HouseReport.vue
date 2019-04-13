<template>
  <div class="house-report">
    <h1 class="house-report-title">{{reportTitle}}</h1>
    <header class="report-nav">
      <div class="report-search">
        <span>请选择时间段 : </span>
         <el-date-picker
          v-if="!reportType"
          v-model="daytime"
          value-format="yyyy-MM-dd"
          size="small"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
          v-if="reportType === 1"
          v-model="daytime"
          value-format="yyyy-MM"
          size="small"
          type="month"
          placeholder="选择月份">
        </el-date-picker>
        <el-date-picker
          v-if="reportType === 2"
          v-model="daytime"
          value-format="yyyy"
          size="small"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </div>
      <div class="report-btn">
        <el-button type="primary" size="small" style="width: 100px" @click="searchReport">查询</el-button>
      </div>
    </header>
    <div class="report-list">
      <div class="house-container">
        <h2 class="list-title">房屋交易报表</h2>
         <el-table
          :data="houseForm"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            align="center"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="new"
            label="增量房交易"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="old"
            label="存量房交易"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="best"
            label="房屋赠与"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="onehouse"
            align="center"
            label="首套">
          </el-table-column>
          <el-table-column
            prop="morehouse"
            align="center"
            label="非首套">
          </el-table-column>
          <el-table-column
            prop="houseing"
            align="center"
            label="住宅">
          </el-table-column>
          <el-table-column
            prop="nohouseing"
            align="center"
            label="非住宅">
          </el-table-column>
        </el-table>
        <h2 class="list-title">税收明细报表</h2>
          <el-table
              :data="taxData"
              border
              style="width: 100%">
              <el-table-column
                prop="tax1"
                label="房屋契税"
                align="center"
                style="white-space:nowrap"
                width="150">
              </el-table-column>
              <el-table-column
                prop="tax2"
                label="印花税"
                align="center"
                style="white-space:nowrap"
                width="130">
              </el-table-column>
              <el-table-column
                prop="tax3"
                label="贴花"
                align="center"
                style="white-space:nowrap"
                width="100">
              </el-table-column>
              <el-table-column
                prop="tax4"
                label="增值税"
                align="center"
                style="white-space:nowrap"
                width="150">
              </el-table-column>
              <el-table-column
                prop="tax5"
                label="个人所得税"
                align="center"
                style="white-space:nowrap"
                width="130">
              </el-table-column>
              <el-table-column
                prop="tax6"
                label="城建税"
                align="center"
                style="white-space:nowrap"
                width="100">
              </el-table-column>
              <el-table-column
                prop="tax7"
                label="教育附加"
                align="center"
                style="white-space:nowrap"
                width="100">
              </el-table-column>
              <el-table-column
                prop="tax8"
                label="地方教育附加"
                align="center"
                style="white-space:nowrap"
                width="110">
              </el-table-column>
              <el-table-column
                prop="tax9"
                label="土地增值税"
                align="center"
                style="white-space:nowrap"
                width="200">
              </el-table-column>
              <el-table-column
                prop="tax10"
                label="产权转移书据"
                align="center"
                style="white-space:nowrap"
                width="130">
              </el-table-column>
              <el-table-column
                prop="allTax"
                label="合计"
                align="center"
                style="white-space:nowrap"
                width="200">
              </el-table-column>
          </el-table> 
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'housereport',
  props: {
    reportTitle: String,
    reportType: Number
  },
  data () {
    return {
      daytime: '',
      allData: [],
      houseForm: [],
      taxData: []
    }
  },
  created () {
    this.reportData();
  },
  methods: {
    reportData () {
      this.$axios.post('http://www.tansuowu.com:3000/api/allDeal')
        .then(res => {
          this.allData = res.data.message;
        })
    },
    searchReport () {
      // 初始化
      this.houseForm = [];
      this.taxData = [];
      let dataArr = [];
      let tax1 = 0;
      let tax2 = 0;
      let tax3 = 0;
      let tax4 = 0;
      let tax5 = 0;
      let tax6 = 0;
      let tax7 = 0;
      let tax8 = 0;
      let tax9 = 0;
      let tax10 = 0;
      let allTax = 0;
      if (!this.reportType) {
        dataArr = this.allData.filter(item => item.date === this.daytime);
      } else {
        dataArr = this.allData.filter(item => item.date.includes(this.daytime))
      } 
      let tableArr = {
        date: this.daytime,
        new: dataArr.filter(item => item.type < 2).length,
        old: dataArr.filter(item => item.type >=2 && item.type <4).length,
        best: dataArr.filter(item => item.type === '4').length,
        onehouse: dataArr.filter(item => item.userHouse === '首套').length,
        morehouse: dataArr.filter(item => item.userHouse === '非首套').length,
        houseing: dataArr.filter(item => item.type === '0' || item.type === '2').length,
        nohouseing: dataArr.filter(item => item.type === '1' || item.type === '3').length
      }
      dataArr.forEach(item => {
        tax1+=Number(item.tax1) * 10000;
        tax2+=Number(item.tax2) * 10000;
        tax3+=Number(item.tax3) * 10000;
        tax4+=Number(item.tax4) * 10000;
        tax5+=Number(item.tax5) * 10000;
        tax6+=Number(item.tax6) * 10000;
        tax7+=Number(item.tax7) * 10000;
        tax8+=Number(item.tax8) * 10000;
        tax9+=Number(item.tax9) * 10000;
        tax10+=Number(item.tax10) * 10000;
      })
      allTax = tax1 + tax2 + tax3 + tax4 + tax5 + tax6 + tax7 + tax8 + tax9 + tax10;
      let taxArr = {
        tax1 : (tax1 / 10000).toFixed(2),
        tax2 : (tax2 / 10000).toFixed(2),
        tax3 : (tax3 / 10000).toFixed(2),
        tax4 : (tax4 / 10000).toFixed(2),
        tax5 : (tax5 / 10000).toFixed(2),
        tax6 : (tax6 / 10000).toFixed(2),
        tax7 : (tax7 / 10000).toFixed(2),
        tax8 : (tax8 / 10000).toFixed(2),
        tax9 : (tax9 / 10000).toFixed(2),
        tax10 : (tax10 / 10000).toFixed(2),
        allTax : (allTax / 1000).toFixed(2)
      }
      this.houseForm.push(tableArr);
      this.taxData.push(taxArr);
    }
  }
}
</script>
<style lang="less" scoped>
.house-report {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .house-report-title {
    font-weight: normal;
    text-align: center;
  }
  .report-nav {
    margin: 0 auto;
    display: flex;
    margin-top: 30px;
    justify-content: center;
    span {
      padding: 0 10px;
    }
    .report-btn {
      margin-left: 20px;
    }
  }
  .report-list {
    margin-top: 20px;
    .list-title {
      line-height: 40px;
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
  }
}
</style>
