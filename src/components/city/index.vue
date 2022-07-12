<script lang="ts" setup name="XtxCity">
export type CityItem = {
  code: string
  level: number
  name: string
  areaList: CityItem[]
}

// 选择的城市结果类型，导出类型必须在最上面
export type CityResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode: string
  countyName: string
}

import { ref, watchEffect } from 'vue';
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'

const active = ref(false)
const target = ref(null)

// 获取省份数据
const cityList = ref<CityItem[]>([])
const cacheList = ref<CityItem[]>([])
async function getCityList() {
  const res = await axios.get<CityItem[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  // console.log(res);
  cityList.value = res.data
  cacheList.value = res.data
}
getCityList()

// 接收父组件传递的默认省市县信息
defineProps<{
  address: string
}>()

// 点击区域外时触发的事件
onClickOutside(target, () => {
  // console.log('点击了');
  active.value = false
})

// 创建省市县的变量
const cityResultList = ref<CityResult>({} as CityResult)
// 定义子传父
const emit = defineEmits<{
  (e: 'changeCity', city: CityResult): void
}>()

// 点击省市县
const selectCity = (city: CityItem) => {
  console.log(city.name);
  // 没有子级就退出模块
  // 确定省信息
  if (city.level === 0) {
    cityResultList.value.provinceName = city.name
    cityResultList.value.provinceCode = city.code
  }
  // 确定市信息
  if (city.level === 1) {
    cityResultList.value.cityName = city.name
    cityResultList.value.cityCode = city.code
  }
  // 确定县信息
  if (city.level === 2) {
    cityResultList.value.countyName = city.name
    cityResultList.value.countyCode = city.code
    // 传值给父组件
    emit('changeCity', cityResultList.value)
  }

  if (!city.areaList) return active.value = false
  cityList.value = city.areaList
}

// 监听 active 的改变，重新输入省级城市
watchEffect(() => {
  if (!active.value) cityList.value = cacheList.value
})

</script>
<template>
  <div ref="target" class="xtx-city">
    <div @click="active = !active" :class="{ active }" class="select">
      <span v-if="address" class="placeholder">{{ address }}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-show="active" class="option">
      <span @click="selectCity(item)" class="ellipsis" v-for="item in cityList" :key="item.name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>