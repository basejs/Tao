<template>
  <el-upload
    class="upload"
    :class="name"
    :action="action"
    :multiple="multiple"
    :show-file-list="showFileList"
    :auto-upload="autoUpload"
    :before-upload="beforeUpload"
    :on-success="success"
    :on-error="error"
  >
    <el-button type="primary" :loading="uploadStatus === 1">
      <template v-if="uploadStatus === 1">
        {{ $t('common.upload.btn.progress') }}
      </template>
      <template v-else>
        {{ $t('common.upload.btn.default') }}
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
    accept: {
      type: String
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
  data() {
    return {
      uploadStatus: 0, // 0:未上传,1:上传中,2:上传成功,3:上传错误
    }
  },
  methods: {
    beforeUpload(file) {
      if(typeof this.before === 'function') {
        const beforeResult = this.before(file)
        if(beforeResult === true || beforeResult === false) return beforeResult
      }

      const isLtSize = file.size / 1024 / 1024 < this.size
      this.uploadStatus = 1
      if(!isLtSize) {
        this.error(this.$t('common.upload.error.size', this.size))
      }
      return isLtSize
    },
    success(res, file, fileList) {
      if(res.code !== 0) {
        this.error(res.msg)
        return false
      }
      this.uploadStatus = 3
      this.$message.success(this.$t('common.upload.success.default'))
      this.$emit('success', res, file, fileList)
    },
    error(err) {
      let errMisg = this.$t('common.upload.error.default')
      if(typeof err === 'string') {
        errMisg = err
      }
      this.uploadStatus = 3
      this.$message.error(errMisg)
      this.$emit('err', err)
    }
  }
}
</script>