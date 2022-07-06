import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'

import { topCategory } from '../constants'
const defaultCategory = topCategory.map(item => ({name:item}))

// interface CategoryItem {
//   id: string
//   name: string
//   picture: string
// }

// interface ApiRes<T> {
//   code: string
//   msg: string
//   result: T[]
// }
 
export default defineStore('category', {
  state() {
    return {
      list: defaultCategory as CategoryItem[]
    }
  },
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem>>('/home/category/head')
      // console.log(res.data)
      res.data.result.forEach(item => item.open = false)
      this.list = res.data.result
    },
    // 控制 li 标签的显示和隐藏
    show(id: string) {
      const item = this.list.find(item => item.id === id)
      // 优雅处理
      // item && (item.open = true)
      // 暴力处理
      item!.open = true
    },
    hide(id: string) {
      const item = this.list.find(item => item.id === id)
      item!.open = false
    }
  }
})