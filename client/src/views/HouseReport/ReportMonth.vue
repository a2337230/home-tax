<template>
  <section class="reportmonth">
    <house-report :reportTitle="reportTitle" :reportType="reportType"></house-report>
  </section>
</template>
<script>
import HouseReport from './HouseReport';
export default {
  name: 'reportmonth',
  data () {
    return {
      reportTitle: '房屋交易月报表',
      reportType: 1 // 0日 1月 2年
    }
  },
  components: {
    HouseReport
  }
}
</script>
