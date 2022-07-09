<script lang="ts" setup>
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import HomeSkeleton from './home-skeleton.vue';
import { useLazyData } from '@/utils/hooks';
const { home } = useStore()
// const target = ref(null)
// home.getNewList()
const target = useLazyData(home.getNewList)

// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     home.getNewList()
//     stop()
//   }
// })
</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
    <!-- 动画都是配合 v-if 和 v-show 来使用 -->
    <!-- 只要提前定义好类样式, 在需要动画的组件外面包一层 transition 组件即可 -->
      <!-- 面板内容 -->
      <transition name="fade">
        <ul class="goods-list" v-if="home.newList.length">
          <li v-for="item in home.newList" :key="item.id">
            <RouterLink to="/">
              <img
                v-lazy="item.picture"
                alt=""
              />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else :count="4"/>
      </transition>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>