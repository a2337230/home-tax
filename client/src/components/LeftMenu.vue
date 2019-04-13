<template>
    <el-row class="left-menu">
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#409eff">
          <router-link to="/">
            <el-menu-item index="0">
              <i class="iconfont icon-shouye icon"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in items">
            <el-submenu v-if="item.children && item.power.includes(user.post)" :index="item.path" :key="item.path">
              <template slot="title">
                <i class="iconfont icon" :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="citem in item.children" :to="citem.path" :key="citem.path">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: "left-menu",
  data() {
    return {
      items: [
        {
          icon: 'icon-lurubaogao',
          name: '房产交易录入',
          path: 'houseinfo',
          power: '业务专员,超级管理员',
          children: [
            {path: '/newresidence', name: '增量房(住房)'},
            {path: '/newbusiness', name: '增量房(非住房)'},
            {path: '/oldresidence', name: '存量房(住房)'},
            {path: '/oldcommhouse', name: '存量房(非住房)'},
            {path: '/bestowal', name: '房屋赠与'},
          ]
        },
        {
          icon: 'icon-chaxun',
          name: '房产交易查询',
          path: 'housefind',
          power: '业务专员,业务负责人,超级管理员',
          children: [
            {path: '/housefind', name: '全部交易信息查询'},
            {path: '/newfind', name: '增量房交易'},
            {path: '/oldfind', name: '存量房交易'},
            {path: '/bestfind', name: '房屋赠与'}
          ]
        },
        {
          icon: 'icon-baobiao',
          name: '房屋交易报表',
          path: 'housereport',
          power: '业务负责人,超级管理员',
          children: [
            {path: '/reportday', name: '日报表'},
            {path: '/reportmonth', name: '月报表'},
            {path: '/reportyear', name: '年度报表'}
          ]
        },
        {
          icon: 'icon-chaxun1',
          name: '单税种查询',
          path: 'taxfind',
          power: '业务负责人,超级管理员',
          children: [
            {path: '/qishui', name: '房屋契税'},
            {path: '/yinhua', name: '印花税'},
            {path: '/tiehua', name: '贴花'},
            {path: '/zengzhi', name: '增值税'},
            {path: '/geshui', name: '个人所得税'},
            {path: '/chengjian', name: '城建税'},
            {path: '/jiaoyu', name: '教育附加税'},
            {path: '/fujiao', name: '地方教育附加税'},
            {path: '/tudi', name: '土地增值税'},
            {path: '/zhuanyi', name: '房产转移书据'},
          ]
        },
        {
          icon: 'icon-shangchuan',
          name: '投诉上报',
          path: 'complain',
          power: '信访专员,超级管理员',
          children: [
            {path: '/attitude', name: '服务态度投诉'},
            {path: '/work', name: '业务投诉'},
            {path: '/law', name: '违法违纪投诉'}
          ]
        },
        {
          icon: 'icon-chaxun1',
          name: '投诉查询',
          path: 'comfind',
          power: '信访负责人,超级管理员',
          children: [
            {path: '/attfind', name: '服务态度投诉'},
            {path: '/workfind', name: '业务投诉'},
            {path: '/lawfind', name: '违法违纪投诉'}
          ]
        },
        {
          icon: 'icon-addressbook2-copy',
          name: '员工通讯录',
          path: 'addressbook',
          power: '业务专员,业务负责人,信访专员,信访负责人,超级管理员',
          children: [
            {path: '/addressbook', name: '员工通讯录'},
          ]
        },
        {
          icon: 'icon-shezhi',
          name: '设置',
          path: 'setting',
          power: '业务专员,业务负责人,信访专员,信访负责人,超级管理员',
          children: [
            {path: '/userinfo', name: '个人信息'}
          ]
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo 
    }
  },
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
      overflow-x: hidden;
}
.el-menu-item{
  height: 50px;
  line-height: 50px;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  min-width: inherit;
}
.icon{
  color: #fff;
  margin-right: 15px;
}
</style>
