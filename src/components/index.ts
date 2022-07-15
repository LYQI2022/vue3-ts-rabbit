import { App } from 'vue'
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import City from './city/index.vue'
import Numbox from './numbox/index.vue'
import Button from './button/index.vue'
import Checkbox from './checkbox/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
// 引入图片
import defaultImg from '@/assets/images/200.png'

export default {
  install(app: App) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(City.name, City)
    app.component(Numbox.name, Numbox)
    app.component(Button.name, Button)
    app.component(Checkbox.name, Checkbox)

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