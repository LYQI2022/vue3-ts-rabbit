<script lang="ts" setup>
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import { Spec, ValueItem } from '@/types/data';
import GoodsDetail from './components/goods-detail.vue';
import GoodsHot from './components/goods-hot.vue';
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
// sub 是当前点击的条目
// item 是当前点击的条目所属的规格
// const hChangeSelected = (sub: ValueItem, item: Spec) => {
//   // 被禁用就不能被选中
//   if (sub.disabled) return
//   // 排他思想，干掉除了我之外的所有人
//   item.values.filter(v => v.name !== sub.name).forEach(i => i.selected = false)
//   // 点击取反控制高亮
//   sub.selected = !sub.selected
// }

const hChangeSku = (skuId: string) => {
  // console.log('父组件得到的 skuId:', skuId)
  // 根据 skuId 找到 sku 对象
  const sku = goods.info.skus.find(item => item.id === skuId)
  // console.log(sku)
  // 找不到就 return
  if (!sku) return
  // 修改商品价格 (此处应该定义 pinia 中的 actions 后修改)
  goods.info.price = sku.price
  goods.info.oldPrice = sku.oldPrice
}

const count = ref(1)

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
          <!-- <GoodsSku sku-id="1369155864430120962" :goods="info" @h-change-selected="hChangeSelected" /> -->
          <GoodsSku @change-sku="hChangeSku" sku-id="1369155864430120962" :goods="info" />
          <XtxNumbox v-model="count" show-label :min="1" :max="info.inventory" />
          <XtxButton type="primary" style="margin-top: 20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer" v-if="info.details">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsDetail :goods="info" />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1" />
          <GoodsHot :type="2" />
          <GoodsHot :type="3" />
        </div>
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