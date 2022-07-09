<script lang="ts" setup>
import useStore from '@/store'
import { useLazyData } from '@/utils/hooks';
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue';
// import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue';

const { home } = useStore()
// const target = ref(null)
// home.getHotList()
// 数据懒加载
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     home.getHotList()
//     stop()
//   }
// })
// 原始封装
// useLazyData(target, () => home.getNewList())

// 借助引用数据类型的特性实现封装
// const target = useLazyData(() => home.getNewList())

// 极致精简 => 将 api 函数直接作为回调传入, 自动执行
const target = useLazyData(home.getHotList)
</script>
<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <transition name="fade">
      <ul ref="pannel" class="goods-list" v-if="home.hotList.length">
        <li v-for="item in home.hotList" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else :count="4"/>
    </transition>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>