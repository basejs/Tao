<template>
  <div class="uploads">
    <ul class="uploads__list">
      <template v-if="datas.length">
        <li 
          class="uploads__item"
          v-for="(item, i) in datas"
          :key="`upload-item${i}`"
          :class="{
            'uploads__item--active': current === item[field]
          }"
          @click="clickItem(item)">
          <img class="uploads__img" :src="item[field]">
          <div class="uploads__control">
            <UploadComponent 
              class="uploads__update" 
              @success="(file) => { updateItem(file, i) }" 
              v-if="update"
            >
              <slot name="update">更换</slot>
            </UploadComponent>
            <el-button class="uploads__del" type="danger" @click="delItem(i, $event)"><slot name="del">删除</slot></el-button>
            <slot name="item" :item="item"></slot>
          </div>
        </li>
      </template>
      <li class="uploads__item uploads__add">
        <UploadComponent 
          class="uploads__add-upload" 
          @success="addUpload" 
          v-if="!(length && datas.length < length)">
          <span class="uploads__add-text">
            <slot name="add"></slot>
          </span>
        </UploadComponent>
      </li>
    </ul>
  </div>
</template>
<script>
import UploadComponent from '@/components/upload/index'

export default {
  model: {
    event: 'change',
    prop: 'datas',
  },
  props: {
    length: {
      type: Number,
      default: 0
    },
    field: {
      type: String,
      default: 'url'
    },
    current: {
      type: String,
      default: 'current',
    },
    datas: {
      type: Array,
      default: () => []
    },
    update: {
      type: Boolean,
      default: false
    },
  },
  components: {
    UploadComponent,
  },
  methods: {
    addUpload(res) {
      this.datas.push({
        [this.field]: res[this.field]
      })
      this.$emit('change', this.datas)
      this.$emit('add', res)
    },
    updateItem(res, i) {
      this.datas[i][this.field] = res[this.field]
      this.$emit('update', i, res)
    },
    clickItem(item) {
      this.$emit('update:current', item[this.field])
    },
    delItem(i) {
      this.datas.slice(i, 1)
      this.$emit('change', this.datas)
    }
  }
}
</script>

