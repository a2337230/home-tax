<template>
  <section class="reportyear">
    <house-report :reportTitle="reportTitle" :reportType="reportType"></house-report>
  </section>
</template>
<script>
import HouseReport from './HouseReport';
export default {
  name: 'reportyear',
  data () {
    return {
      reportTitle: '房屋交易年报表',
      reportType: 2 // 0日 1月 2年
    }
  },
  components: {
    HouseReport
  }
}
</script>
