export interface CategoryItem {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
  open: boolean
  goods: GoodsItem[]
  saleInfo: string
}

export interface ApiRes<T> {
  code: string
  msg: string
  result: T
}

export interface GoodsItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: number;
  orderNum?: number;
}

export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

export interface NewItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: number;
  orderNum: number;
}

export interface HotItem {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

export type BrandItem = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}

 export interface ChildItem {
  id: string;
  name: string;
  layer: number;
  parent?: any;
}

export interface SpecialItem {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
}

// 顶级分类
export interface TopCategory {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
}

// 二级分类
export interface SaleProperty {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}

export interface SubCategory {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: GoodsItem[]
}

// 商品详情
export type GoodsInfo = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs: Spec[]
  skus: SkuItem[]
}

export type Spec = {
  name: string
  values: ValueItem[]
  selected: boolean
}

export type ValueItem = {
  desc: string
  name: string
  picture: string
  selected: boolean
}

export type SkuItem = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}
