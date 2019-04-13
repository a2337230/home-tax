<template>
  <section class="law">
    <editor :complainTitle="complainTitle"></editor>
  </section>
</template>
<script>
import Editor from './Editor';
export default {
  name: 'attitude',
  data () {
    return {
      complainTitle: '违法违纪投诉上报'
    }
  },
  components: {
    Editor
  }
}
</script>
