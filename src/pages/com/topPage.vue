<template>
  <div class="top" v-if="weatherInfo">
    <div class="top_l">
      <div class="title">乡村千寻多维可视化云平台</div>
      <div class="flex flex-1 text-[#DAE5E6]">
        <template v-for="i in btn" :key="i.type">
          <div
            class="top_btn cursor-pointer"
            :class="{ active: topClickType == i.type }"
            @click="topClick(i.type)"
          >
            {{ i.name }}
          </div>
          <div class="slash"></div>
        </template>
        <div
          class="top_btn cursor-pointer relative"
          @click="showMany = !showMany"
        >
          <span class="text-26px">更多</span>
          <img class="w-24px h-14px ml-6px" :src="getAssets('icon_xl.png')" />
          <div v-show="showMany" class="many_main">
            <template v-for="i in many" :key="i.name">
              <div
                class="mb-6px text-24px item relative"
                @click="manyClick(i.url)"
              >
                {{ i.name }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="top_r">
      <div class="top_info">
        <div
          class="flex items-center text-14px cursor-pointer"
          @click="manyClick('https://www.baidu.com/')"
        >
          <img class="w-72px h-77px mr-8px" :src="getAssets('icon_jrht.png')" />
          <span class="ml-[-20px]">进入后台</span>
        </div>
        <div class="w-1px h-36px bg-#ABBDE3 mx-17px opacity-60"></div>
        <div class="flex flex-col justify-center items-center">
          <span class="text-20px">{{ time }}</span>
          <span class="text-12px">{{ years }}</span>
        </div>

        <div class="w-1px h-36px bg-#ABBDE3 mx-17px opacity-60"></div>
        <img
          class="w-24px h-24px mr-8px"
          :src="getAssets(`${weatherInfo.wea_img}.png`)"
        />
        {{ weatherInfo?.tem }}°C
      </div>
    </div>
  </div>
  <XXJJ v-if="topClickType == btn[0].type" />
  <XCFZ v-else-if="topClickType == btn[1].type"  @show-info="showInfo"/>
  <XCZL v-else @show-info="showInfo" />
  <TableInfo
    :table-info="tableInfo"
    :show-table="showTable"
    @update:show-table="showTable = $event"
  />
</template>

<script setup lang="ts">
import TableInfo from "./tableInfo.vue";
import XXJJ from "./topBtnPage/xcjj.vue";
import XCFZ from "./topBtnPage/xcfz.vue";
import XCZL from "./topBtnPage/xczl.vue";
// // import { getWeather } from "@/service/api";
import getAssets from "@/utils/getAssets";
import { useTopTypeStore } from "@/store";
const topType = useTopTypeStore();
const btn = [
  {
    name: "乡村简介",
    type: "jj",
  },
  {
    name: "乡村发展",
    type: "fz",
  },
  {
    name: "乡村治理",
    type: "zl",
  },
];
const many = [
  { name: "测试测试", url: "https://www.baidu.com/" },
  { name: "测试测试", url: "https://www.baidu.com/" },
  { name: "测试测试", url: "https://www.baidu.com/" },
];
const years = useDateFormat(useNow(), "YYYY.MM.DD"); //年份
const time = useDateFormat(useNow(), "HH:mm:ss"); //时间
const weatherInfo = ref<any>("11"); //天气
const topClickType = ref<any>(); //默认页面
const showTable = ref<boolean>(false); //是否展示表单
const tableInfo = ref<any>(); //点击建筑物table数据
const showMany = ref<boolean>(false);

const init = async () => {
  // weatherInfo.value = await getWeather();
  topClick(btn[0].type);
};
// 页面切换按钮点击
const topClick = (type) => {
  topClickType.value = type;
  topType.setTopClickType(type);
  showTable.value = false;
};
// 更多点击功能
const manyClick = (url) => {
  window.open(url, "_blank");
};

// 子组件列表点击进行表单展示
const showInfo = (i)=>{
showTable.value = true;
tableInfo.value = i;
}

init();
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 88px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box;
  .top_l {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding-left: 40px;
    flex: 1;
    background: url("../../assets/img/top-bgl.png") no-repeat;
    background-size: 100% 100%;
    .title {
      font-family: "FZCHSJT";
      margin-top: 21px;
      width: 48%;
      font-size: 40px;
      color: #fdfff7;
    }
    .top_btn {
      text-align: center;
      margin-top: 12px;
      font-size: 24px;
      .many_main {
        box-sizing: border-box;
        color: #dae5e6;
        position: absolute;
        top: 55px;
        left: -30px;
        width: 140px;
        padding: 14px 20px 8px;
        background: url("../../assets/img/many-bg.png") no-repeat;
        background-size: 100% 100%;

        .item:hover::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 8px;
          background: url(../../assets/img/icon_gy.png) no-repeat left
            center/100% auto;
        }
      }
    }
    .top_btn,
    div {
      font-family: "USTitleBlack";
    }
    .slash {
      margin: 19px 29px 0;
      height: 18px;
      transform: rotate(30deg);
      background: #7a7f80;
      width: 1px;
    }
  }
  .top_r {
    width: 435px;
    height: 56px;
    padding-right: 28px;
    display: flex;
    justify-content: flex-end;
    background: url("../../assets/img/top-bgr.png") no-repeat;
    background-size: 100% 100%;
    .top_info {
      display: flex;
      align-items: center;
      color: #cedef8;
    }
  }

  .active {
    position: relative;
    color: #f2feff !important;
  }
  .active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    height: 3px;
    background: url(../../assets/img/line_top.png) no-repeat left center/100%
      auto;
  }
}
</style>
