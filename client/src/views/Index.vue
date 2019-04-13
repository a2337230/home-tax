<template>
  <div class="index">
    <header-nav></header-nav>
    <div class="content">
      <section class="left-container">
        <el-scrollbar style="height:100%">
          <left-menu></left-menu>
        </el-scrollbar>
      </section>
      <section class="rightContainer">
        <el-scrollbar style="height:100%">
          <router-view></router-view>
        </el-scrollbar>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderNav from './../components/HeaderNav'
import LeftMenu from './../components/LeftMenu'
export default {
  name: "index",
  components: {
    HeaderNav,
    LeftMenu
  }
};
</script>
<style lang="less" scoped>
.index{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: calc(~"100% - 61px");
  display: flex;
  .left-container {
    width: 180px;
    min-width: 180px;
    height: 100%;
    overflow-y: auto;
    background-color: #324057;
  }
  .rightContainer {
    width: calc(~"100% - 180px");
    flex: 1;
    min-height: 100%;
  }
}
</style>
