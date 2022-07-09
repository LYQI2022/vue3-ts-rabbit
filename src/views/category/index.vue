<template>
  <div class="category">
    分类组件
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
    </XtxBread>
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { watch } from 'vue';
import { useRoute } from 'vue-router'
const { category } = useStore()
const route = useRoute()
// console.log(route.params.id);
// category.getTopCategory(route.params.id as string)
// setup的代码只会执行一次，因此需要监听路由的变化，来改变面包屑
// 刷新页面会丢失面包屑，需要从第一次就开始了监听路由状态
// 返回首页的 id 是 undefined，需要判断路由地址是否相同 
watch(() => route.params.id, () => {
  if (route.fullPath === `/category/${route.params.id}`) {
    category.getTopCategory(route.params.id as string)
  }
}, {
  immediate: true
})

</script>

<style></style>