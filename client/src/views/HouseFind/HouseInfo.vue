<template>
  <div class="house-info">
    <header class="header">
      <h1 class="title">{{findTitle}}</h1>
      <nav class="nav">
        <div class="name" @click="findtype='1';time.start='';time.end=''">
          <el-radio v-model="findtype" label="1">买方姓名查询</el-radio>
          <el-input
            v-model="buyer"
            placeholder="请输入买方姓名"
            size="small"
            style="width: 150px"
            @keydown.enter.native="infoSearch"
          >
          </el-input>
        </div>
        <div class="time" @click="findtype='2';buyer=''">
          <el-radio v-model="findtype" label="2">办理时间查询</el-radio>
          <el-date-picker
            v-model="time.start"
            type="date"
            style="width:140px"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择开始日期">
          </el-date-picker>
          <span> 至 </span>
          <el-date-picker
            v-model="time.end"
            type="date"
            style="width:140px"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择结束日期">
          </el-date-picker>
        </div>
        <div class="info-btn">
          <el-button type="primary" size="small" @click="infoSearch">查询</el-button>
        </div>
      </nav>
    </header>
    <section class="house-list">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="办理时间"
          sortable
          align="center"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="买方姓名"
          align="center"
          style="white-space:nowrap"
        >
          <template slot-scope="scope">
            <span style="white-space: nowrap">{{ scope.row.buyer}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="vendor"
          label="卖方姓名"
          align="center"
          style="white-space:nowrap"
        >
          <template slot-scope="scope">
            <span style="white-space: nowrap">{{ scope.row.vendor?scope.row.vendor:scope.row.builder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          width="100"
          label="交易类型">
          <template slot-scope="scope">
            <span style="white-space: nowrap">{{ scope.row.type | formatType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyerprice"
          align="center"
          label="买方税额">
        </el-table-column>
        <el-table-column
          prop="vendorprice"
          align="center"
          label="卖方税额">
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total">
        </el-pagination>
      </div>
    </section>
    <el-dialog
      title="房屋交易详情"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="false"
      align="center"
    >
      <div class="user-container">
        <p><span>买家 : {{oneHouseInfo.buyer}}</span><span>身份证 : {{oneHouseInfo.buyerId}}</span> </p>
        <p><span>卖家 : {{oneHouseInfo.vendor?oneHouseInfo.vendor:oneHouseInfo.builder}}</span><span v-if="oneHouseInfo.vendorId">身份证 : {{oneHouseInfo.vendorId}}</span> </p>
        <p>房屋地址 : {{oneHouseInfo.address}}</p>
        <div class="house-info">
          <span>建筑面积 : {{oneHouseInfo.area}}</span>
          <span>房屋价格 : {{oneHouseInfo.price}}</span>
          <span>房屋朝向 : {{oneHouseInfo.direction}}</span>
        </div>
      </div>
      <el-table
        :data="oneHouseInfo.tax"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="税种"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="税率"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="税额">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'houseinfo',
  props: {
    findTitle: String,
    findType: Number
  },
  created () {
    this.getProfile();
  },
  data () {
    return {
      dialogTableVisible: false,
      findtype: '1',
      buyer: '',
      time: {
        start: '',
        end: ''
      },
      allTableData: [],
      tableData:[],
      paginations: {
        page_index: 1, // 当前页
        total: 0, // 数据总数
        page_size: 5, // 单页显示多少条
        page_sizes: [5,10,20,50,100], // 下拉选项
        layout: "total, sizes, prev, pager, next, jumper"
      },
      oneHouseInfo: {}
    }
  },
  methods: {
    // 获取数据
    getProfile () {
      if (this.findType === 0) {
        this.$axios.post('http://www.tansuowu.com:3000/api/allDeal')
        .then(res => {
          this.allTableData = res.data.message;
          this.allTableData = this.allTableData.sort( (n1,n2) => {
            return new Date(n2.date) - new Date(n1.date)
          })
          // 设置分页数据
          this.setPaginations();
        })
      } else if (this.findType === 1) {
        this.$axios.post('http://www.tansuowu.com:3000/api/newDeal')
        .then(res => {
          this.allTableData = res.data.message;
          this.setPaginations();
        })
      } else if (this.findType === 2) {
        this.$axios.post('http://www.tansuowu.com:3000/api/oldDeal')
        .then(res => {
          this.allTableData = res.data.message;
          this.setPaginations();
        })
      } else {
        this.$axios.post('http://www.tansuowu.com:3000/api/bestDeal')
        .then(res => {
          this.allTableData = res.data.message;
          this.setPaginations();
        })
      }
    },
    setPaginations () {
      // 分页属性
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size;
      })
    },
    // 查询
    infoSearch () {
      if (!this.buyer && !this.time.start && !this.time.start) {
        this.getProfile();
      } else if (this.buyer) {
        let searchArr = [];
        searchArr = this.allTableData.filter(item => item.buyer.includes(this.buyer));
        this.tableData = searchArr;
      } else {
        const sTime = new Date(this.time.start).getTime();
        const eTime = new Date(this.time.end).getTime()
        if (eTime < sTime) {
          this.$message({
            message: '结束时间不能小于开始时间,请重新选择',
            type: 'error',
          })
          return
        }
        this.tableData = this.allTableData.filter(item => {
          let date = new Date(item.date)
          let time = date.getTime();
          return time >=sTime && time <=eTime;
        })
      }
      this.paginations.total = this.tableData.length;
    },
    handleSizeChange (page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      // 更新数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < page_size;
      })
    },
    handleCurrentChange (page) {
      // 获取当前页
      let index = this.paginations.page_size * (page -1);
      let nums = this.paginations.page_size * page;
      // 临时数组
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    // handleClick (info) {
    //   this.dialogTableVisible = true;
    //   let tax = [];

    //   this.oneHouseInfo = {
    //     buyer : info.buyer,
    //     buyerId : info.buyerId,
    //     vendor : info.vendor,
    //     vendorId : info.vendorId,
    //     builder : info.builder,
    //     address : info.address,
    //     price : info.price,
    //     area : info.area,
    //     direction : info.direction,
    //     tax: []
    //   };
    //   this.oneHouseInfo.tax.push(tax)
    //   console.log(tax)
    // }
  },
  filters: {
    formatType (type) {
      let houstType = ''
      if (type < 2) {
        houstType = '增量房交易'
      } else if (type >= 2 && type < 4) {
        houstType = '存量房交易'
      } else {
        houstType = '房屋赠与'
      }
      return houstType
    }
  }
}
</script>
<style lang="less" scoped>
.house-info {
  min-width: 880px;
  padding: 20px;
  box-sizing: border-box;
  .header {
    width: 100%;
    margin-bottom: 20px;
    .title {
      font-weight: normal;
      font-size: 18px;
      text-align: center;
    }
    .nav {
      display: flex;
      margin-top: 20px;
      .name {
        flex-direction: row;
        width: 400px;
        text-align: center;
      }
      .time {
        flex: 1;
        flex-direction: row;
        text-align: center;
      }
      .info-btn {
        width: 60px;
        text-align: center;
      }
    }
  }
  .page {
    margin-top: 20px;
    text-align: right;
  }
}
.user-container {
  p {
    display: flex;
    line-height: 30px;
    font-size: 14px;
    text-align: left;
    span {
      &:first-child {
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .house-info {
    min-width: 520px;
    padding: inherit;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
