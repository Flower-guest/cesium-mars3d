<template>
  <div class="top" v-if="weatherInfo">
    <div class="h-100% flex flex-col justify-center">
      <img
        class="max-w-560px h-34px mb-5px"
        :src="getAssets('top_name_cn.png')"
      />
      <img class="max-w-560px h-17px" :src="getAssets('top_name_en.png')" />
    </div>
    <div class="flex items-end text-20px text-#CEDEF8">
      <template v-for="i in btn" :key="i.type">
        <div
          class="top_btn cursor-pointer"
          :class="{ active: topClickType == i.type }"
          @click="topClick(i.type)"
        >
          {{ i.name }}
        </div>
      </template>
      <div class="top_info">
        {{ years }}
        <div class="w-1px h-24px bg-#ABBDE3 mx-20px"></div>
        {{ time }}
        <div class="w-1px h-24px bg-#ABBDE3 mx-20px"></div>
        <img
          class="w-24px h-24px mr-2px"
          :src="getAssets(`${weatherInfo.wea_img}.png`)"
        />
        {{ weatherInfo?.tem }}°C
      </div>
    </div>
  </div>
  <XXJJ v-if="topClickType == 'sp'" />
  <XCFZ v-else-if="topClickType == 'zs'" />
  <XCZL v-else />
</template>

<script setup lang="ts">
import XXJJ from "./topBtnPage/xcjj.vue";
import XCFZ from "./topBtnPage/xcfz.vue";
import XCZL from "./topBtnPage/xczl.vue";
// import { getWeather } from "@/service/api";
import getAssets from "@/utils/getAssets";
import { useTopTypeStore } from "@/store";
const topType = useTopTypeStore();
const btn = [
  {
    name: "数字沙盘",
    type: "sp",
  },
  {
    name: "规划招商",
    type: "zs",
  },
  {
    name: "乡村治理",
    type: "zl",
  },
];
const years = useDateFormat(useNow(), "YYYY.MM.DD");
const time = useDateFormat(useNow(), "HH:mm:ss");
const weatherInfo = ref<any>("11");
const topClickType = ref("sp");

const topClick = (type) => {
  topClickType.value = type;
  topType.setTopClickType(type);
};
// const init = async () => {
//   weatherInfo.value = await getWeather();
// };

// init();
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 94px;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/img/top-bg.png") no-repeat;
  background-size: 100% 100%;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 5px 0 5px 10px;
  color: #fff;
  box-sizing: border-box;

  .top_btn {
    text-align: center;
    line-height: 55px;
    width: 280px;
    height: 55px;
    background: url("../../assets/img/top_btn_bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: 26px;
  }
  .top_info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: -98px;
    padding-right: 23px;
    width: 454px;
    height: 55px;
    background: url("../../assets/img/top_time_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .active {
    color: yellow !important;
  }
}
</style>
