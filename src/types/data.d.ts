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
