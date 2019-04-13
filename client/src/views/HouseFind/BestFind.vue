<template>
  <section class="bestfind">
    <house-info :findType="findType" :findTitle="findTitle"></house-info>
  </section>
</template>
<script>
import HouseInfo from './HouseInfo'
export default {
  name: 'bestfind',
  data () {
    return {
      findTitle: "房屋赠与交易查询",
      findType: 3 // 查询类型 0全部 1增量房 2存量房 3房屋赠与
    }
  },
  components: {
    HouseInfo
  }
}
</script>
