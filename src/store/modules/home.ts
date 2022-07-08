import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem } from '@/types/data'
 
export default defineStore('home', {
  state() {
    return {
      bannerList: [] as BannerItem[]
    }
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem>>('/home/banner')
      // console.log(res.data);
      this.bannerList = res.data.result
    }
  }
})