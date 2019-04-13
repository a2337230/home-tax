<template>
  <div class="newrbusiness">
    <residence :title="title" :transType="transType"></residence>
  </div>
</template>
<script>
import Residence from './Residence';
export default {
  name: "newresidence",
  data () {
    return {
      title: "增量房(非住房)信息录入",
      transType: 1 // 0增量住房  1增量商服 2存量住房 3存量商服
    }
  },
  components: {
    Residence
  }
}
</script>