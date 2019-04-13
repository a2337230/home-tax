<template>
  <div class="oldresidence">
    <residence :title="title" :transType="transType"></residence>
  </div>
</template>
<script>
import Residence from './Residence';
export default {
  name: "oldcommhouse",
  data () {
    return {
      title: "存量房(非住房)信息录入",
      transType: 3 // 0增量住房  1增量商服 2存量住房 3存量商服
    }
  },
  components: {
    Residence
  }
}
</script>
