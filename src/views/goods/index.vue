<script lang="ts" setup>
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import { Spec, ValueItem } from '@/types/data';
const { goods } = useStore() 
const route = useRoute()
watchEffect(() => {
  if (route.fullPath !== '/goods/' + route.params.id) return
  goods.resetGoodsInfo()
  goods.getGoodsInfo(route.params.id as string)
})
// 解构数据
const { info } = storeToRefs(goods)

// 修改子组件的数据
const hChangeSelected = (sub: ValueItem, item: Spec) => {
  // 排他思想，干掉所有人
  item.values.forEach(i => i.selected = false)
  // 点击取反控制高亮
  sub.selected = !sub.selected
}

</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <div style="height: 70px;">
        <transition name="fade-in-out">
          <XtxBread v-if="info.categories">
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem :to="`/category/sub/${info.categories[1].id}`">{{ info.categories[0].name }}</XtxBreadItem>
            <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">{{ info.categories[1].name }}</XtxBreadItem>
            <XtxBreadItem>{{ info.name }}</XtxBreadItem>
          </XtxBread>
          <!-- 骨架瓶 -->
          <XtxBread v-else>
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="28" :height="18" />
            </XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="76" :height="18" />
            </XtxBreadItem>
            <XtxBreadItem>
              <XtxSkeleton opacity="0.2" bg="#27bb9a" animated :width="156" :height="18" />
            </XtxBreadItem>
          </XtxBread>
        </transition>
      </div>
      <!-- 商品信息 -->
      <div v-if="goods.info.mainPictures" class="goods-info">
        <div class="media">
          <GoodsImage :images="info.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="info" />
          <GoodsSku :goods="info" @h-change-selected="hChangeSelected" />
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>