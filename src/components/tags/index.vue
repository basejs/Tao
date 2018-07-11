<template>
  <div class="tags">
    <el-tag
      class="tags__item"
      v-for="(tag, i) in value"
      :key="`tag${i}`"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="tags__input"
      v-if="inputVisible"
      v-model.trim="tagText"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="tags__add" size="small" @click="showInput">{{text}}</el-button>
  </div>
</template>
<script>
import './index.scss'

export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    text: {
      type: String,
      default: '+ 新增标签'
    }
  },
  data() {
    return {
      tagText: '',
      inputVisible: false,
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
    },
    handleInputConfirm() {
      if (!this.tagText) return false
      const current = this.value.find(item => item === this.tagText)
      if (current) {
        this.$message.warning('重复数据')
        return
      }
      this.value.push(this.tagText)
      this.tagText = ''
      this.inputVisible = false
    },
    handleClose(tag) {
      const n = this.value.filter(item => item !== tag)
      this.$emit('change', n)
    }
  }
}
</script>
