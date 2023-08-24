<template>
  <div class="left flex">
    <div v-show="dialog">
      <InfoDialog :title="'xczl'">
        <template #infoMain>
          <div class="info_main">
            <div class="main-title">
              <span>数据统计</span>
            </div>
            <div class="px-24px grid grid-cols-2">
              <template v-for="i in tj.xczl" :key="i.val">
                <div class="mt-22px mr-8px flex">
                  <img
                    class="w-51px h-50px mr-15px"
                    :src="getAssets(i.imgUrl)"
                  />
                  <div class="grid grid-rows-2">
                    <div class="text-36px">
                      {{ i.val }}<span class="text-16px">{{ i.unit }}</span>
                    </div>
                    <span class="text-[#2FC6DC] text-16px">{{ i.label }}</span>
                  </div>
                </div>
              </template>
            </div>
            <div class="mt-27px">
              <div class="main-title">
                <span>资产管理</span>
              </div>
              <div class="relative">
                <div
                  class="absolute top-[-20px] flex justify-between w-100% text-[#DAE3E6] text-16px"
                >
                  <div>登记资产总数：<span class="text-24px">972</span></div>
                  <span>单位：个</span>
                </div>
                <div
                  class="mt-40px"
                  id="mydzb"
                  style="width: 100%; height: 180px"
                ></div>
              </div>
            </div>
            <!-- 资产列表 -->
            <div class="mt-20px">
              <div class="main-title flex justify-between">
                <span>资产列表</span>
                <div class="flex">
                  <template v-for="i in xczlZS" :key="i.val">
                    <div
                      class="cursor-pointer ml-23px text-14px"
                      @click="infoClick(i)"
                    >
                      <div :class="{ activeItem: zxActive == i.val }">
                        {{ i.label }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!-- 搜索功能 -->
            <div
              class="my-18px text-[#DAE3E6] text-16px flex items-center search"
            >
              <img
                class="w-24px h-24px mr-8px"
                :src="getAssets('icon_search.png')"
                @click="isShowSearch = !isShowSearch"
              />
              <el-input
                v-show="isShowSearch"
                v-model="searchVal"
                @change="onSearch"
                placeholder="请输入搜索关键字"
              >
                <template #suffix>
                  <div class="w-1px h-16px bg-[#5C9099]"></div>
                    <img
                      class="w-10px h-10px mx-8px"
                      :src="getAssets('icon_ss.png')"
                    />
                    <span class="text-[#EDF4FF] text-12px cursor-pointer">搜索</span>
                </template>
              </el-input>
              <span v-show="!isShowSearch"
                >为您找到{{ listLength }}个项目</span
              >
            </div>
            <!-- 列表 -->
            <List :list="xcfzList.zsxm"  @show-info="showInfo"/>
          </div>
        </template>
      </InfoDialog>
    </div>
    <img
      class="w-51px h-101px"
      :class="{ jump: !dialog }"
      @click="dialog = !dialog"
      :src="getAssets(dialog ? 'sq.png' : 'zk.png')"
    />
  </div>
</template>

<script lang="ts" setup>
import "./com.less";
import List from "./list.vue";
import { xczlZS, xcfzList, tj } from "./pageConst";
import getAssets from "@/utils/getAssets";
import { debounce } from "@/utils/throttle";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;

const dialog = ref<boolean>(true);
const zxActive = ref<any>("fwzc"); //乡村资讯tab点击
const isShowSearch = ref<boolean>(false);
const searchVal = ref<any>("");
const listLength = computed(() => {
  return xcfzList.zsxm.length || 0
})
const infoClick = (i) => {
  zxActive.value = i.val;
};

const emit = defineEmits(["showInfo"]);
const showInfo =(i)=>{
  emit("showInfo",i);
}

// 搜索事件
const onSearch = debounce((value: string | number) => {
  isShowSearch.value = !isShowSearch.value;
  console.log(value);
});

let option: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  color: ["#42CEF7", "#3C5DC9", "#FFE71F", "#5498FF", "#F36868"],
  series: [
    {
      type: "pie",
      radius: [20, 80],
      data: [
        { value: 58, name: "房屋" },
        { value: 52, name: "农田" },
        { value: 38, name: "水塘" },
        { value: 12, name: "山林" },
        { value: 18, name: "其它" },
      ],
      roseType: "area",
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        color: "#41A6FC",
      },
      labelLine: {
        smooth: 0.2,
        length: 10,
        length2: 10,
      },
    },
  ],
};

onMounted(() => {
  const chartDom = document.getElementById("mydzb")!;
  const myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  };
});
</script>

<style lang="less" scoped>
:deep(.el-input) {
  width: 100%;
  height: 28px;

  .el-input__wrapper {
    background: #0d2124;
    box-shadow: inset 0px 0px 5px -1px #92efff;
    border-radius: 8px;
    padding-left: 20px;

    .el-input__inner {
      color: #7ac0cc;
    }

    .el-input__inner::placeholder {
      color: #7ac0cc;
    }
  }
}
</style>
