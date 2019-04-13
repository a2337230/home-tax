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
      url: '/attfind/',
      comTitle: "服务态度投诉"
    }
  },
  components: {
    Comfind
  }
}
</script>
