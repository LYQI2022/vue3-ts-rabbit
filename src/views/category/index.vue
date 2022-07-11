<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <XtxCarousel style="height: 500px;" :slides="home.bannerList"/>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img v-lazy="item.picture" >
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <transition name="fade-in-out">
        <!-- 分类关联商品 -->
        <div v-if="topCategory.children" >
          <div class="ref-goods" v-for="sub in topCategory.children" :key="sub.id">
            <div class="head">
              <h3>- {{ sub.name }} -</h3>
              <p class="tag">温暖柔软，品质之选</p>
              <XtxMore />
            </div>
            <div class="body">
              <GoodsItem :goods="item" v-for="item in sub.goods" :key="item.id" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="ref-goods" v-for="i in 5" :key="i">
            <div class="head">
              <h3><XtxSkeleton :height="30" :width="300" animated /></h3>
              <p class="tag"></p>
              <XtxSkeleton style="position: absolute; right: 20px; top: 40px;" :height="21" :width="70" animated />
            </div>
            <div class="body" style="display: flex; justify-content: space-between;">
              <XtxSkeleton :height="300" :width="200" animated v-for="item in 5" :key="item" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import { watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item.vue'
const { category, home } = useStore()
const route = useRoute()
// console.log(route.params.id);
// category.getTopCategory(route.params.id as string)
// setup的代码只会执行一次，因此需要监听路由的变化，来改变面包屑
// 刷新页面会丢失面包屑，需要从第一次就开始了监听路由状态
// 返回首页的 id 是 undefined，需要判断路由地址是否相同 
// watch(() => route.params.id, () => {
//   if (route.fullPath === `/category/${route.params.id}`) {
//     category.getTopCategory(route.params.id as string)
//   }
// }, {
//   immediate: true
// })
watchEffect(() => {
  // console.log(route.params.id);
  if (route.fullPath === `/category/${route.params.id}`) {
  category.getTopCategory(route.params.id as string)
}
})

// 发送请求获取轮播图数据
home.getBannerList()

// 解构数据，变成响应式
const { topCategory } = storeToRefs(category)
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

 .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>