<template>
  <form>
    <textarea 
      class="kindeditor" 
      :style="{
        width,
        height,
        visibility: 'hidden'
      }" 
      :value="content"></textarea>
  </form>
</template>
<script>
import '@/../static/kindeditor/themes/default/default.css'

export default {
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    value: {
      type: String,
    },
    width: {
      type: String,
      default: '800px',
    },
    height: {
      type: String,
      default: '400px'
    },
    minWidth: {
      type: Number,
      default: 200,
    },
    minHeight: {
      type: Number,
      default: 100,
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    content: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('change', v)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      import('@/../static/kindeditor/kindeditor-all.js')
      .then(() => import('@/../static/kindeditor/lang/zh-CN.js'))
      .then(() => {
        self.editor = window.KindEditor.create('.kindeditor', {
          allowFileManager: true,
          basePath: '/static/kindeditor/',
          items: [
            'source', '|',
            'formatblock', 'fontname', 'fontsize', '|',
            'forecolor', 'hilitecolor', 'bold',
            'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
            'undo', 'redo', '|', 'selectall', 'cut', 'copy',
            'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
            'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent',
            'quickformat', 'clearhtml', '|',
            'image', 'media', 'insertfile', '|',
            'table', 'hr', 'baidumap', 'pagebreak',
            'link', 'unlink', 'print', 'fullscreen',
          ],
          minWidth: this.minWidth,
          minHeight: this.minHeight,
          afterChange() {
            if (self.editor) {
              self.content = self.editor.html()
            }
          }
        })
      })
    }
  }
}
</script>
