<template>
  <div>
    <div class="left">
      <div class="flex">
        <div v-show="dialog">
          <InfoDialog :title="'乡村发展概况'" :height="319" :padding="'0 15px'">
            <template #infoMain>
              <div class="pt-29px">
                <div class="flex justify-between">
                  <template v-for="i in xczlList" :key="i.img">
                    <img class="w-39px h-39px mr-6px" :src="getAssets(i.img)" />
                    <div class="flex flex-col items-start justify-center">
                      <span class="f9 mb-4px">{{ i.label1 }}</span>
                      <span class="text-13px">{{ i.label2 }}</span>
                    </div>
                  </template>
                </div>
                <div class="info">
                  <span>2023年游客量趋势</span>
                  <span class="text-#65C6E7"
                    >年游客量 <font color="#CCC137">124.4</font> 万人</span
                  >
                </div>
                <div id="main" style="width: 100%; height: 200px"></div></div
            ></template>
          </InfoDialog>
        </div>
        <img
          class="w-103px h-55px"
          @click="dialog = !dialog"
          :src="getAssets(dialog ? 'sq.png' : 'zk.png')"
        />
      </div>
      <div class="mt-19px" v-show="dialog">
        <InfoDialog :title="'景点热门排行榜'" :height="256" :padding="'0 25px'">
          <template #infoMain>
            <img class="w-100% h-100%" :src="getAssets('rmphb.png')" />
          </template>
        </InfoDialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { xczlList } from "../../config/topBtnPage";
import getAssets from "@/utils/getAssets";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const dialog = ref<boolean>(true);

let option: EChartsOption = {
  title: {
    text: "单位（万人）",
    textStyle: {
      fontSize: 12,
      color: "#FAE7DB",
    },
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
    axisLabel: {
      color: "#fff",
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#fff",
    },
  },
  series: [
    {
      data: [10, 20, 40, 20, 10, 9, 5, 10],
      type: "line",
      itemStyle: {
        color: "#00F9FF",
      },
      areaStyle: {
        color: "#2578AB",
      },
      label: {
        show: true,
        position: "top",
        color: "#fff",
      },
      lineStyle: {
        color: "#00F9FF",
      },
    },
  ],
};

onMounted(() => {
  const chartDom = document.getElementById("main")!;
  const myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  };
});
</script>

<style lang="less" scoped>
.left {
  position: absolute;
  top: 150px;
  left: 44px;
  color: #fff;
  .info {
    margin-top: 29px;
    margin-bottom: 20px;
    background: url("../../../assets/img/zlgkbg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 7px 13px;
    font-size: 14px;
  }
}

.f9 {
  font-size: 12px;
  transform: scale(0.75);
}
</style>
