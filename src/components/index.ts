import XtxSkeleton from '@/components/index.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component('XtxSkeleton',XtxSkeleton)
  }
}