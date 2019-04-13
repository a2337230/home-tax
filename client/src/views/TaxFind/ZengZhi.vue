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
      taxTitle: "增值税",
      tax: "tax4"
    }
  },
  components: {
    UserTax
  }
}
</script>
