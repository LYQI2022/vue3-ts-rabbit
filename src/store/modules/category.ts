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
      this.list = res.data.result
    }
  }
})