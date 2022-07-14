<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, ValueItem } from '@/types/data';
import bwPowerSet from '@/utils/bwPowerSet'

const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()

// const emit = defineEmits<{
//   (e: 'hChangeSelected', sub: ValueItem, item: Spec) : void
// }>()
// const changeSelected = (sub: ValueItem, item: Spec) => {
//   emit('hChangeSelected', sub, item)
// }

const emit = defineEmits<{
  (e: 'changeSku', skuId: string): void
}>()

const SEPARATOR = '☆'

const changeSelected = (sub: ValueItem, item: Spec) => {
  // 判断如果被禁用了就不要选中
  if (sub.disabled) return

  // 干掉除了我之外的所有人
  item.values.filter(v => v.name !== sub.name).forEach(i => i.selected = false)

  // 修改当前被点击的对象属性 selected 取反
  // selected 默认是 undefined 而 undefined 取反正好是 true
  sub.selected = !sub.selected

  // 调用 updateDisabledStatus
  // 更新组合规格的禁用状态
  // 该调用必须在排他结束后执行
  updateDisabledStatus()

  // 获取当前选中的规格
  // 判断是否选中了所有规格, 如果选中了就子传父将 skuId 传递过去
  const result = getSelectedSpec()
  // console.log(result)
  // 此方案可行
  // const isAll = result.every(item => item)
  // console.log(isAll)
  // 此方案也可行
  // result.filter(i => i).length === props.goods.specs.length
  // 当全不选中, 将 skuId 传递给父组件
  if (result.every(item => item)) {
    // 如何获取 skuId ?
    const key = result.join(SEPARATOR)
    const val = pathMap[key]
    // console.log(val[0])
    emit('changeSku', val[0])
  }
}


// 测试 powerset 算法
// const result = bwPowerSet(['a', 'b'])
// console.log(result);

function getPathMap() {
  // 1. 将没有库存的物品全部去掉
  const skus = props.goods.skus.filter(item => item.inventory > 0)
  // console.log(skus);
  // 创建路径字典
  const pathMap: any = {}
  // 2. 算法需要字符串数组 => 将对象数组转换成字符串数组
  skus.forEach(item => {
    const arr = item.specs.map(v => v.valueName)
    // console.log(arr);
    // 3. 调用算法生成子集
    const result = bwPowerSet(arr)
    // console.log(result);
    // 4. 往路径字典对象中添加属性
    result.forEach(arrItem => {
      // console.log(arrItem);
      const key = arrItem.join(SEPARATOR)
      // console.log(key);
      // 'xxx' in 对象 作用是判断 'xxx' 是否是对象的属性, 有就返回 true, 没有就是 false
      if (key in pathMap) {
        // 如果对象中有这个属性，就直接将 id 添加到数组
        pathMap[key].push(item.id)
        // console.log(pathMap[key].push(item.id));
      } else {
        // 没有这个属性，则创建一个数组，再添加 id
        pathMap[key] = [item.id]
        // console.log(pathMap[key]);
        // console.log(pathMap[key] = [item.id]);
      }
    })
  })
  return pathMap
}

// 修改禁用状态, 页面加载时就对所有元素进行修改
function updateDisabledStatus() {
  // 获取所有选中商品的规格
  // const selectedArr = getSelectedSpec()
  // console.log(selectedArr);
  
  // 遍历出所需要的数据
  props.goods.specs.forEach((item, index) => {
    item.values.forEach(sub => {
      // 查看字典里是否有这个属性，有就可以点击，没有就禁用
      // if (sub.name in pathMap) {
      //   sub.disabled = false
      // } else {
      //   sub.disabled = true
      // }
      // 返回的数据是 ['黑色', '', '']
      const selectedArr = getSelectedSpec()
      // 使用索引来实现更换数据
      selectedArr[index] = sub.name
      // console.log(selectedArr, sub.name, index)
      // 筛选出拥有的数据，然后根据结果禁用按钮，join的值必须保持一致
      const key = selectedArr.filter(v => v).join(SEPARATOR)
      // console.log(key);
      // sub.disabled = !(sub.name in pathMap)
      sub.disabled = !(key in pathMap)
    })
  })
}

// 获取被选中的规格
function getSelectedSpec() {
  // 希望获取每个规格被选中的值: ['', '', '']
  const arr: string[] = []
  // 遍历所有规格，获取他们的选中状态
  props.goods.specs.forEach(item => {
    const result = item.values.find(sub => sub.selected)
    // console.log(result?.name);
    arr.push(result?.name || '')
  })
  return arr
}

// 初始勾选状态
function initSpecSelected() {
  // 没有 skuId 就退出
  if (!props.skuId) return
  // 通过 skuId 找到当前勾选的 sku 的规格
  const result = props.goods.skus.find(item => item.id === props.skuId)
  // 没有找到则退出，防止传过来一个假的 id
  if (!result) return
  // console.log(result.specs);
  // 获取规格对应的具体内容
  const selectArr = result.specs.map(item => item.valueName)
  // console.log(selectArr);
  // 遍历所有规格，处理选中状态
  props.goods.specs.forEach(item => {
    // 如果数据里面有对应的数据，则默认选中
    item.values.forEach(sub => {
      sub.selected = selectArr.includes(sub.name)
      // if (selectArr.includes(sub.name)) {
      //   sub.selected = true
      // }
    })
  })
}

// 1. 获取路径字典
const pathMap = getPathMap()
// console.log(pathMap)

// 2. 初始化勾选状态
initSpecSelected()

// 3. 更新单个规格的禁用状态
updateDisabledStatus()
// const update = updateDisabledStatus()
// console.log(update);


</script>
<template>
  <div v-for="item in goods.specs" :key="item.name" class="goods-sku">
    <dl>
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
          @click="changeSelected(sub, item)"
            v-if="sub.picture"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            :src="sub.picture"
            alt=""
            :title="sub.name"
          />
          <span @click="changeSelected(sub, item)" :class="{ selected: sub.selected, disabled: sub.disabled }" v-else>{{ sub.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
