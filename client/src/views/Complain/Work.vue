<template>
  <section class="work">
    <editor :complainTitle="complainTitle"></editor>
  </section>
</template>
<script>
import Editor from './Editor';
export default {
  name: 'attitude',
  data () {
    return {
      complainTitle: '业务投诉上报'
    }
  },
  components: {
    Editor
  }
}
</script>
