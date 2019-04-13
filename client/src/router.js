import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/404.vue";

// 二级路由
import Home from './views/Home.vue'; // 首页
import UserInfo from './views/UserInfo/UserInfo.vue'; // 个人信息页面
// 二级路由房屋交易录入
import NewResidence from './views/HouseInfo/NewResidence.vue'; // 增量住房录入
import NewBusiness from './views/HouseInfo/NewBusiness.vue'; // 增量非住房录入
import OldResidence from './views/HouseInfo/OldResidence.vue'; // 存量房住房录入
import OldCommhouse from './views/HouseInfo/OldCommhouse.vue'; // 二手商服录入
import Bestowal from './views/HouseInfo/Bestowal.vue'; // 房屋赠与录入
// 二级房屋查询路由
import HouseFind from './views/HouseFind/HouseFind.vue'; // 全部信息查询
import NewFind from './views/HouseFind/NewFind.vue'; // 增量房查询
import OldFind from './views/HouseFind/OldFind.vue'; // 存量房查询
import BestFind from './views/HouseFind/BestFind.vue'; // 存量房查询
// 二级报表查询路由
import ReportDay from './views/HouseReport/ReportDay.vue'; // 日报表
import ReportMonth from './views/HouseReport/ReportMonth.vue'; // 月报表
import ReportYear from './views/HouseReport/ReportYear.vue'; // 年报表
// 单税种查询
import QiShui from './views/TaxFind/QiShui.vue'; // 契税
import YinHua from './views/TaxFind/YinHua.vue'; // 印花税
import TieHua from './views/TaxFind/TieHua.vue'; // 贴花
import ZengZhi from './views/TaxFind/ZengZhi.vue'; // 贴花
import GeShui from './views/TaxFind/GeShui.vue'; // 个税
import ChengJian from './views/TaxFind/ChengJian.vue'; // 城建
import JiaoYu from './views/TaxFind/JiaoYu.vue'; // 教育
import FuJiao from './views/TaxFind/FuJiao.vue'; // 地方教育
import TuDi from './views/TaxFind/TuDi.vue'; // 土地增值
import ZhuanYi from './views/TaxFind/ZhuanYi.vue'; // 土地增值
// 员工通讯录
import AddressBook from './views/AddressBook/AddressBook.vue';
// 投诉上报
import Attitude from './views/Complain/Attitude.vue'; // 服务态度投诉
import Work from './views/Complain/Work.vue'; // 业务投诉
import Law from './views/Complain/Law.vue'; // 违法违纪投诉
// 投诉查询
import AttFind from './views/Comfind/AttFind.vue'; // 服务态度投诉查询
import WorkFind from './views/Comfind/WorkFind.vue'; // 业务投诉查询
import LawFind from './views/Comfind/LawFind.vue'; // 违法违纪投诉查询
import Detail from './views/Comfind/Detail.vue'; 
Vue.use(Router);

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      children: [
        {path: '', component: Home},
        {path: '/home', name:"Home", component: Home},
        // 个人信息
        {path: '/userinfo', name:"UserInfo", component: UserInfo},
        // 增量房
        {path: '/newresidence', name:"NewResidence", component: NewResidence},
        {path: '/newbusiness', name:"NewBusiness", component: NewBusiness},
        // 存量房
        {path: '/oldresidence', name:"OldResidence", component: OldResidence},
        {path: '/oldcommhouse', name:"OldCommhouse", component: OldCommhouse},
        {path: '/bestowal', name:"Bestowal", component: Bestowal},
        // 全部交易查询
        {path: '/housefind', name:"HouseFind", component: HouseFind},
        {path: '/newfind', name:"NewFind", component: NewFind},
        {path: '/oldfind', name:"OldFind", component: OldFind},
        {path: '/bestfind', name:"BestFind", component: BestFind},
        // 报表查询
        {path: '/reportday', name:"ReportDay", component: ReportDay},
        {path: '/reportmonth', name:"ReportMonth", component: ReportMonth},
        {path: '/reportyear', name:"ReportYear", component: ReportYear},
        // 单税种查询
        {path: '/qishui', name:"QiShui", component: QiShui},
        {path: '/yinhua', name:"YinHua", component: YinHua},
        {path: '/tiehua', name:"TieHua", component: TieHua},
        {path: '/zengzhi', name:"ZengZhi", component: ZengZhi},
        {path: '/geshui', name:"GeShui", component: GeShui},
        {path: '/chengjian', name:"ChengJian", component: ChengJian},
        {path: '/jiaoyu', name:"JiaoYu", component: JiaoYu},
        {path: '/fujiao', name:"FuJiao", component: FuJiao},
        {path: '/tudi', name:"TuDi", component: TuDi},
        {path: '/zhuanyi', name:"ZhuanYi", component: ZhuanYi},
        // 员工通讯录
        {path: '/addressbook', name:"AddressBook", component: AddressBook},
        // 投诉上报
        {path: '/attitude', name:"Attitude", component: Attitude},
        {path: '/work', name:"Work", component: Work},
        {path: '/law', name:"Law", component: Law},
        // 投诉查询
        {path: '/attfind', name:"AttFind", component: AttFind},
        {path: '/workfind', name:"WorkFind", component: WorkFind},
        {path: '/lawfind', name:"LawFind", component: LawFind},
        // 投诉详情页
        {path: '/attfind/:id', name:"AttDetail", component: Detail},
        {path: '/workfind/:id', name:"WorkDetail", component: Detail},
        {path: '/lawfind/:id', name:"LawDetail", component: Detail},
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.userInfo?true:false;
  if (to.path === '/login') {
    next();
  } else {
    isLogin?next():next('/login');
  }
})
export default router;