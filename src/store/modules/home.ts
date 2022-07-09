import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, BannerItem, BrandItem, CategoryItem, HotItem, NewItem, SpecialItem } from '@/types/data'
 
export default defineStore('home', {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newList: [] as NewItem[],
      hotList: [] as HotItem[],
      brandList: [] as BrandItem[],
      goodsList: [] as CategoryItem[],
      specialList: [] as SpecialItem[]
    }
  },
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      // console.log(res.data);
      this.bannerList = res.data.result
    },
    // 新鲜好物数据
    async getNewList() {
      const res = await request.get<ApiRes<NewItem[]>>('/home/new')
      // console.log(res.data);
      this.newList = res.data.result
    },
    // 人气推荐数据
    async getHotList() {
      const res = await request.get<ApiRes<HotItem[]>>('/home/hot')
      // console.log(res.data);
      this.hotList = res.data.result
    },
    // 热门品牌
    async getbrandList() {
      const res = await request.get<ApiRes<BrandItem[]>>('/home/brand')
      // console.log(res.data);
      this.brandList = res.data.result
        // this.brandList = [...res.data.result, ...res.data.result, ...res.data.result]
    },
    // 商品区域
    async getGoodsList() {
      const res = await request.get<ApiRes<CategoryItem[]>>('/home/goods')
      // console.log(res.data);
      this.goodsList = res.data.result
    },
    // 最新专题
    async getSpecialList() {
      const res = await request.get<ApiRes<SpecialItem[]>>('/home/special')
      // console.log(res.data);
      this.specialList = res.data.result
    }
  }
})