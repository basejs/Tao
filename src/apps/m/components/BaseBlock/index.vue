<template>
  <div
    class="base-block"
    :class="[klass, {'base-block--mp': marginPadding}]">
    <slot></slot>
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
      marginPadding: {
        type: Boolean,
        required: false,
        default: true
      }
    }
  }
</script>

