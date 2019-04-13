<template>
  <section class="find-house">
    <house-info :findType="findType" :findTitle="findTitle"></house-info>
  </section>
</template>
<script>
import HouseInfo from './HouseInfo'
export default {
  name: 'housefind',
  data () {
    return {
      findTitle: "全部房屋交易查询",
      findType: 0 // 查询类型 0全部 1增量房 2存量房 3房屋赠与
    }
  },
  components: {
    HouseInfo
  }
}
</script>
<style lang="less" scoped>

</style>

