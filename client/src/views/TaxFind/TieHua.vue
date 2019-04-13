<template>
  <section class="usertax">
    <user-tax :tax="tax" :taxTitle="taxTitle"></user-tax>
  </section>
</template>
<script>
import UserTax from './UserTax';
export default {
  name: 'qishui',
  data () {
    return {
      taxTitle: "房屋贴花",
      tax: "tax3"
    }
  },
  components: {
    UserTax
  }
}
</script>
