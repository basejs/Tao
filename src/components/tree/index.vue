<template>
  <ul :class="[`${name}__ul`, `${name}__ul${level}`]" v-if="datas && datas.length">
    <li 
      v-for="(item, i) in datas" 
      :key="`${name}tree${level}${i}`"
      :class="{
        [`${name}__li`]: true,
        [`${name}__li--showchild`]: item.showChild,
        [`${name}__li--current`]: checkCurrent(item)
      }
    ">
      <template v-if="toggle && !item.hideToggle && item[child] && item[child].length">
        <i :class="{
          [`${name}__toggle`]: true,
          'el-icon-caret-bottom': item.showChild,
          'el-icon-caret-right': !item.showChild
        }" @click="toggleNode(item, $event)"></i>
      </template>
      <slot :node="item" :index="i" :level="level" :parents="datas" :component="_self"></slot>
      <tree :name="name" :datas="item[child]" :child="child" :check-current="checkCurrent" :level="level+1" :toggle="toggle" v-if="item[child] && item[child].length">
        <template slot-scope="props">
          <slot :node="props.node" :index="props.index" :level="props.level" :parents="props.parents" :component="props.component"></slot>
        </template>
      </tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'tree',
  props: {
    // 树名称
    name: {
      type: String,
      default: 'tree'
    },
    datas: Array,
    child: {
      type: String,
      default: 'children'
    },
    // 检测高亮的方法
    checkCurrent: {
      type: Function,
      default() {
        return () => false
      },
    },
    // 是否显示展开关闭按钮
    toggle: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 1
    }
  },
  methods: {
    toggleNode(node, e) {
      this.$set(node, 'showChild', !node.showChild)
      e.stopPropagation()
    },
  }
}
</script>
