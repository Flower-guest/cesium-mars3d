<template>
  <div>
    <!-- 列表 -->
    <div class="list">
      <div class="item" :style="{backgroundColor:clickItem==idx? 'rgba(51,116,128,0.8)': ''}" v-for="(i,idx) in list" :key="i.name" @click="showInfo(i,idx)">
        <img class="w-80px h-80px mr-8px" :src="getAssets(i.img)" />
        <div class="flex flex-col text-12px text-[#DAE5E6]">
          <span class="text-18px text-[#fff] mb-4px">{{ i.name }}</span>
          <span>登记时间：{{ i.time }}</span>
          <span class="my-2px">占地面积：{{ i.mj }}</span>
          <div>
            价格：<span class="text-[#BFC52E]">{{ i.jg }}</span>
          </div>
        </div>
        <div
          class="state"
          :style="{
            background: i.state == 0 ? '#BFC52E' : '#2EAEC5',
          }"
        >
          <span>{{ i.state == 0 ? "招商中" : "已出租" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import getAssets from "@/utils/getAssets";
interface detailProps {
  list: any;
}
// const props = defineProps<detailProps>();
defineProps<detailProps>();
const clickItem = ref<number>();
const showInfo = (i, idx) => {
  clickItem.value = idx;
  console.log(i)
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 4px;
  .item {
    position: relative;
    margin-top: 8px;
    width: 100%;
    height: 96px;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #5c9099;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    .state {
      position: absolute;
      top: -1px;
      right: -1px;
      width: 64px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0px 8px 0px 8px;
    }
  }
}
.list::-webkit-scrollbar {
  width: 5px;
}

.list::-webkit-scrollbar-track {
  background: rgb(179, 177, 177);
  border-radius: 10px;
}

.list::-webkit-scrollbar-thumb {
  background: #5c9099;
  border-radius: 10px;
}
</style>
