<script lang="ts" setup>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
// import HomePanel from './components/home-panel.vue';
import HomeNew from './components/home-new.vue';
import HomeHot from './components/home-hot.vue';
import HomeBrand from './components/home-brand.vue';
import HomeProduct from './components/home-product.vue';
import HomeSpecial from './components/home-special.vue';
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>

    <!-- 新鲜好物 -->
    <!-- <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore/>
      </template>
    </HomePanel> -->
    <HomeNew></HomeNew>

      <!-- 人气推荐 -->
  <!-- <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
    <p>这里是很多人气推荐的图片</p>
    <p>这里是很多人气推荐的图片</p>
    <p>这里是很多人气推荐的图片</p>
    <p>这里是很多人气推荐的图片</p>
    <p>这里是很多人气推荐的图片</p>
    <p>这里是很多人气推荐的图片</p>
  </HomePanel> -->
  <HomeHot></HomeHot>
  <!-- 热门品牌 -->
  <HomeBrand></HomeBrand>
  <!-- 商品区域 -->
   <HomeProduct></HomeProduct>
   <!-- 最新专题 -->
   <HomeSpecial></HomeSpecial>
  </div>
</template>



<style lang="less" scoped>

</style>