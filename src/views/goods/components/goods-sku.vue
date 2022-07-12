<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, ValueItem } from '@/types/data';
import bwPowerSet from '@/utils/bwPowerSet'

const props = defineProps<{
  goods: GoodsInfo
}>()

const emit = defineEmits<{
  (e: 'hChangeSelected', sub: ValueItem, item: Spec) : void
}>()
const changeSelected = (sub: ValueItem, item: Spec) => {
  emit('hChangeSelected', sub, item)
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
      const key = arrItem.join('☆')
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

const pathMap = getPathMap()
// console.log(pathMap);



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
            :class="{ selected: sub.selected }"
            :src="sub.picture"
            alt=""
            :title="sub.name"
          />
          <span @click="changeSelected(sub, item)" :class="{ selected: sub.selected }" v-else>{{ sub.name }}</span>
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
