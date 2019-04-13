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
      url: '/lawfind/',
      comTitle: "违法违纪投诉"
    }
  },
  components: {
    Comfind
  }
}
</script>
