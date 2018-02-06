<template>
  <div id="app" class="wrapper">
    <router-view v-wechat-title="title"></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$store.state.title
    }
  },
}
</script>