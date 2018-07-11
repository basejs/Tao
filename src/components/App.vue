<template>
  <div id="app" class="wrap">
    <router-view v-wechat-title="title"></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    title() {
      return this.$store.state.title
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    ...mapActions('user', ['getUserData'])
  }
}
</script>