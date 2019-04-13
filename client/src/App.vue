<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  created () {
    if (localStorage.userInfo) {
      const user = JSON.parse(localStorage.userInfo)
      this.$store.dispatch("setUserInfo", user)
    }
  }
}
</script>

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
