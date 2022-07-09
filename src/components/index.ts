import { App } from 'vue'
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import XtxBread from './Bread/index.vue'
import XtxBreadItem from './Bread/Item.vue'
import { useIntersectionObserver } from '@vueuse/core'
// 引入图片
import defaultImg from '@/assets/images/200.png'

export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)

    // 全局注册自定义指令
    app.directive('lazy', {
      mounted(el, binding) {
        // console.log(el,binding);
        useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting);
          if (isIntersecting) {
            el.src = binding.value
          }
          el.onerror = () => {
            el.src = defaultImg
          }
        })
      }
    })
  }
}