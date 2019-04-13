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
      taxTitle: "房屋契税",
      tax: "tax1"
    }
  },
  components: {
    UserTax
  }
}
</script>
