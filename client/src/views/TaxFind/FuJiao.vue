<template>
  <section class="usertax">
    <user-tax :tax="tax" :taxTitle="taxTitle"></user-tax>
  </section>
</template>
<script>
// 1、契税 2、印花税（买） 3、贴花
// 4、增值税 5、个人所得税 6、城建 7、教育 8、地方教育 9、土地增值税 10、印花税（卖）
import UserTax from './UserTax';
export default {
  name: 'qishui',
  data () {
    return {
      taxTitle: "地方教育附加费",
      tax: "tax8"
    }
  },
  components: {
    UserTax
  }
}
</script>
