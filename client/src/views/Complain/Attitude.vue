<template>
  <section class="attitude">
    <editor :complainTitle="complainTitle"></editor>
  </section>
</template>
<script>
import Editor from './Editor';
export default {
  name: 'attitude',
  data () {
    return {
      complainTitle: '服务态度投诉上报'
    }
  },
  components: {
    Editor
  }
}
</script>
