<template>
  <div contenteditable="true" :class="className" v-html="content" @input="changeText"></div>
</template>
<script>
export default {
  props: ['value', 'className'],
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.content = this.value
  },
  methods: {
    changeText() {
      this.$emit('input', this.$el.innerHTML)
    }
  }
}
</script>
