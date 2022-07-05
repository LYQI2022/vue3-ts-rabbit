<template>
  <div>
    App 组件
  </div>
</template>

<script setup lang="ts">
import axios from '@/utils/request'
axios.get('/home/index').then(res => console.log(res)
)

</script>

<style scoped>

</style>