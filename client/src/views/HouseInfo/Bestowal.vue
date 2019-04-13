<template>
  <div class="bestowal">
    <residence :title="title" :transType="transType"></residence>
  </div>
</template>
<script>
import Residence from './Residence';
export default {
  name: "bestowal",
  data () {
    return {
      title: "房屋赠与信息录入",
      transType: 4 // 0增量住房  1增量商服 2存量住房 3存量商服
    }
  },
  components: {
    Residence
  }
}
</script>
