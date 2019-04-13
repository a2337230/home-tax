<template>
  <section class="reportday">
    <house-report :reportTitle="reportTitle" :reportType="reportType"></house-report>
  </section>
</template>
<script>
import HouseReport from './HouseReport';
export default {
  name: 'reportday',
  data () {
    return {
      reportTitle: '房屋交易日报表',
      reportType: 0 // 0日 1月 2季度 3年
    }
  },
  components: {
    HouseReport
  }
}
</script>
