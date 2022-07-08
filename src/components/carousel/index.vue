<script lang="ts" setup name="XtxCarousel">
// 传统写法: 推荐
// defineProps({
//   slides: {
//     type: Array,
//     required: true
//   }
// })

import { BannerItem } from '@/types/data';
import { onMounted, onUnmounted, ref } from 'vue';

const {slides, autoplay = true, duration = 3000} = defineProps<{
  slides: BannerItem[]
  autoplay?: boolean
  duration?: number
}>()

// 淡入淡出的轮播图是轮播图界的青铜
// 定义一个当前轮播图的索引
const active = ref(0)

const prev = () => {
  active.value--
  if (active.value < 0) {
    active.value = slides.length - 1
  }
}

const next = () => {
  active.value++
  if (active.value >= slides.length) {
    active.value = 0
  }
}

let timerId = -1

// 鼠标进入轮播区域停止自动轮播
const stop = () => {
  clearInterval(timerId)
}

// 鼠标离开轮播区域重新开始自动轮播
const start = () => {
  timerId = window.setInterval(() => {
    next()
    // console.log('正在滚动中...')
  }, duration)
}

// 组件挂载时开始定时器
onMounted(() => {
  start()
})

// 组件销毁时清除定时器
onUnmounted(() => {
  stop()
})

</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <!-- 图片结构 -->
    <ul class="carousel-body">
      <!-- fade: 加上该类名的轮播图会显示, 其他会隐藏 -->
      <li v-for="(item, index) in slides" :key="item.id" class="carousel-item" :class="{ fade: active === index }">
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>

    <!-- 左右按钮 -->
    <a href="javascript:;" class="carousel-btn prev" @click="prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="next"
      ><i class="iconfont icon-angle-right"></i
    ></a>

    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span v-for="(item, index) in slides" :key="item.id" :class="{ active: active === index }" @mouseenter="active = index"></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>