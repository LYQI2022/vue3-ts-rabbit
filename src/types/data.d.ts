export interface CategoryItem {
  id: string
  name: string
  picture: string,
  children: CategoryItem[],
  open: boolean
  goods: GoodsItem[]
}

export interface ApiRes<T> {
  code: string
  msg: string
  result: T[]
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
