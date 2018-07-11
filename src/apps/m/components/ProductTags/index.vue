<template>
  <div class="product-tags" :class="klass">
    <span
      class="product-tags__item"
      v-for="(item, index) in tagsLimited"
      :key="index">
      {{ item }}
    </span>
  </div>
</template>

<script>
  import './index.scss'

  export default {
    props: {
      klass: {
        type: String,
        required: false
      },
      tags: {
        type: Array,
        required: true
      }
    },
    computed: {
      tagsLimited() {
        return this.tags.slice(0, 2)
      }
    }
  }
</script>
