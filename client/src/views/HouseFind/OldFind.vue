<template>
  <section class="oldfind">
    <house-info :findType="findType" :findTitle="findTitle"></house-info>
  </section>
</template>
<script>
import HouseInfo from './HouseInfo'
export default {
  name: 'oldfind',
  data () {
    return {
      findTitle: "存量房交易查询",
      findType: 2 // 查询类型 0全部 1增量房 2存量房 3房屋赠与
    }
  },
  components: {
    HouseInfo
  }
}
</script>
