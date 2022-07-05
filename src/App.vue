<template>
  <div>
    App 组件
  </div>
  <h1>
    这是一个 h1 标签
  </h1>
</template>

<script setup lang="ts">
import axios from '@/utils/request'
axios.get('/home/index').then(res => console.log(res)
)

</script>

<style scoped lang="less">
// @import '@/assets/styles/variables.less';
// @import '@/assets/styles/mixins.less';
h1 {
  background-color: @xtxColor;
  height: 100px;
  .hoverShadow ()
}

</style>