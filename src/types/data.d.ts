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
