<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right" v-if="!hideBreadcrumb">
    <template v-for="item in breads">
      <el-breadcrumb-item 
      :key="item.path"
      :to="{path: item.path}"
      >{{item.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    hideBreadcrumb() {
      return this.$route.meta.hideBreadcrumb
    },
    breads() {
      const list = this.$route.matched.map(item => ({
        path: item.path,
        title: item.meta ? item.meta.title : '',
        redirect: item.redirect,
      })).slice(1)
      const routes = this.$route.path.split('/')
      list.forEach(item => {
        const o = item.path.split('/')
        const n = o.map((v, i) => {
          if (!/^\w+$/.test(v)) {
            return routes[i]
          }
          return v
        })
        item.path = n.join('/')
      })
      return list.slice(1)
    },
  },
}
</script>
