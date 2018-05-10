<template>
  <script type="text/plain" class="umeditor" :id="name" :style="{
    height: height ? (isNaN(height) ? height : `${height}px`) : '100%',
    width: width ? (isNaN(width) ? width : `${width}px`) : '100%',
  }"></script>
</template>
<script>
import Vue from 'vue'
import './index.scss'

export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        lang: Vue.config.lang === 'zh-CN' ? 'zh-cn' : 'en'
      })
    },
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
    },
    height: {
      type: [Number, String],
      default: '',
    },
    width: {
      type: [Number, String],
      default: '',
    },
  },
  mounted() {
    this.um = UM.getEditor(this.name, {
      initialContent: this.content,
      initialFrameWidth: null,
      toolbar: ['source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
        'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
        '| justifyleft justifycenter justifyright justifyjustify |',
        'link unlink | emotion image video  | map',
        '| horizontal print preview fullscreen', 'drafts', 'formula'],
      imageUrl: '/FileUpload',
      imagePath: '',
      ...this.options,
    })
    this.um.addListener('blur', () => {
      this.asyncContent()
    })
  },
  watch: {
    content(n, o) {
      if(n !== o) {
        this.um.setContent(n || '')
      }
    }
  },
  beforeDestroy() {
    this.um.destroy()
  },
  methods: {
    asyncContent() {
      this.$emit('asyncContent', this.um.getContent())
    }
  },
}
</script>
