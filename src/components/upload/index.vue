<template>
  <el-upload
    class="upload"
    :class="name"
    :action="action"
    :accept="accept"
    :multiple="multiple"
    :show-file-list="showFileList"
    :auto-upload="autoUpload"
    :before-upload="beforeUpload"
    :on-success="success"
    :on-error="error"
  >
    <el-button type="primary" plain :loading="uploadStatus === 1">
      <template v-if="uploadStatus === 1">
        上传中
      </template>
      <template v-else>
        <slot>立即上传</slot>
      </template>
    </el-button>
  </el-upload>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    },
    action: {
      type: String,
      default: '/FileUpload'
    },
    multiple: {
      type: Boolean
    },
    fileTypes: {
      type: Array,
      default() {
        return ['png', 'jpg', 'jpeg', 'gif']
      },
    },
    before: {
      type: [Function, String],
    },
    size: {
      type: Number,
      default: 2,
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    accept() {
      const types = []
      if (this.fileTypes && this.fileTypes.length > 0) {
        Object.keys(this.mime).forEach((key) => {
          if (this.fileTypes.findIndex(c => c.toLowerCase() === key.toString()) > -1) {
            types.push(this.mime[key])
          }
        })
      }
      return types.join(',')
    }
  },
  data() {
    return {
      uploadStatus: 0, // 0:未上传,1:上传中,2:上传成功,3:上传错误
      mime: {
        png: 'image/png',
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        bmp: 'image/bmp',
        gif: 'image/gif',
        ico: 'image/vnd.microsoft.icon',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        csv: 'text/csv',
      },
    }
  },
  methods: {
    beforeUpload(file) {
      if (typeof this.before === 'function') {
        const beforeResult = this.before(file)
        if (beforeResult === true || beforeResult === false) return beforeResult
      }

      const fileExtension = file.name.split('.').reverse()[0]
      if (!fileExtension ||
        fileExtension.length === 0 ||
        this.fileTypes.findIndex(c => c.toLowerCase() === fileExtension.toLowerCase()) < 0) {
        this.error(this.$t('common.upload.error.filetype', this.fileTypes.join('、')))
        return false
      }

      const isLtSize = file.size / 1024 / 1024 < this.size
      this.uploadStatus = 1
      if (!isLtSize) {
        this.error(this.$t('common.upload.error.size', this.size))
      }
      return isLtSize
    },
    success(res, file, fileList) {
      if (res.code !== 0) {
        this.error(res.msg)
        return false
      }
      this.uploadStatus = 3
      this.$message.success(this.$t('common.upload.success.default'))
      this.$emit('success', res, file, fileList)
    },
    error(err) {
      let errMisg = this.$t('common.upload.error.default')
      if (typeof err === 'string') {
        errMisg = err
      }
      this.uploadStatus = 3
      this.$message.error(errMisg)
      this.$emit('error', err)
    }
  }
}
</script>