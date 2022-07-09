import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue';

export function useLazyData(callback: () => void) {
  const target = ref(null)
  // 数据懒加载
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 进入可视区域要做的事情
      callback()
      stop()
    }
  }, {
    // 阈值
    threshold: 0
  })
  return target
}
