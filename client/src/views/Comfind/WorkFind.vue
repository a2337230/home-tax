<template>
  <section class="attfind">
    <comfind :comTitle="comTitle" :url="url"></comfind>
  </section>
</template>
<script>
import Comfind from './Comfind';
export default {
  name: 'attfind',
  data () {
    return {
      url: '/workfind/',
      comTitle: "业务投诉"
    }
  },
  components: {
    Comfind
  }
}
</script>
