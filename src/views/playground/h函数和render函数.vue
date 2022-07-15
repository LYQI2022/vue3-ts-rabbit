<template>
  <div ref="dv">
    
  </div>
</template>

<script setup lang="ts">
// 为什么要用 h 和 render?
// 使用 js 来创建组件
// 知识点: h 函数和 render 函数
// 作用:
// h 函数可以创建一个虚拟 DOM
// render 函数可以将虚拟 DOM 渲染到页面

// 使用方法: 
// 1. 从 vue 包里按需导入函数
// HyperNode h
// 
import { h, onMounted, ref, render, createElementVNode } from 'vue'

const dv = ref<HTMLDivElement | null>(null)

// 参数1: type 类型, 要创建什么虚拟 DOM, 可以传入标签名 / 组件对象
// 参数2: 标签的属性
// 参数3: 子节点 => 元素节点 文本节点 
// <h1 title="">刘狄威很大</h1>
// 返回值: 虚拟 DOM, VNode => Virtual Node 虚拟节点
const vnode = h('h1', { title: '年龄' }, '刘狄威很小')

onMounted(() => {
  // 参数1: 虚拟 DOM
  // 参数2: 挂载点 (真实 DOM)
  render(vnode, dv.value as HTMLDivElement)
})

</script>

<style scoped>

</style>