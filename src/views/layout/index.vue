<script setup lang="ts" name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';

</script>


<template>
    <AppTopnav/>
    <AppHeader/>
    <AppHeaderSticky/>
    <div class="app-body">
      <!-- 路由出口 -->
      <RouterView></RouterView>
    </div>
    <AppFooter/>
</template>


<style scoped lang="less">
.app-body {
  min-height: 600px;
}

</style>