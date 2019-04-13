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
      taxTitle: "印花税",
      tax: "tax2"
    }
  },
  components: {
    UserTax
  }
}
</script>
