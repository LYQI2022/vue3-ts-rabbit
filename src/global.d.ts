import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
// 参考：
declare module 'vue' {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton,
    XtxCarousel: typeof XtxCarousel
  }
}
export {}