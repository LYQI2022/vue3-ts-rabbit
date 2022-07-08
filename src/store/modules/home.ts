import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem, HotItem, NewItem } from '@/types/data'
 
export default defineStore('home', {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newList: [] as NewItem[],
      hotList: [] as HotItem[]
    }
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res.data);
      this.bannerList = res.data.result
    },
    // 新鲜好物数据
    async getNewList() {
      const res = await request.get<ApiRes<NewItem>>('/home/new')
      // console.log(res.data);
      this.newList = res.data.result
    },
    // 人气推荐数据
    async getHotList() {
      const res = await request.get<ApiRes<HotItem>>('/home/hot')
      // console.log(res.data);
      this.hotList = res.data.result
    }
  }
})