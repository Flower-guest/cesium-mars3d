<template>
  <div class="left">
    <div class="flex">
      <div v-show="dialog">
        <InfoDialog :title="'治理列表'" :height="277" :padding="'13px 0'">
          <template #infoMain>
            <div class="text-14px">
              <div class="flex head mb-4px">
                <span
                  class="py-8px px-10px text-center"
                  v-for="(i, d) in xcfzList"
                  :key="d"
                  :class="d == 0 ? 'w-13%' : 'w-29%'"
                  >{{ i.label }}</span
                >
              </div>
              <div class="flex" v-for="(i, d) in xcfzData" :key="i.sblx">
                <span class="py-8px px-10px w-13% text-center"
                  >0{{ d + 1 }}</span
                >
                <span class="py-8px px-10px w-29% text-center">{{
                  i.sblx
                }}</span>
                <span class="py-8px px-10px w-20% text-center">{{
                  i.sbrxm
                }}</span>
                <span class="py-8px px-10px w-39% text-center">{{
                  i.sbsj
                }}</span>
              </div>
            </div>
            <!-- <TableList
              class="zl_list"
              :height="277"
              :data="xcfzData"
              :table-list="xcfzList"
            /> -->
          </template>
        </InfoDialog>
      </div>
      <img
        class="w-103px h-55px"
        @click="dialog = !dialog"
        :src="getAssets(dialog ? 'sq.png' : 'zk.png')"
      />
    </div>
    <div class="mt-19px" v-show="dialog">
      <InfoDialog :title="'治理类别'" :height="220" :padding="'13px 7px'">
        <template #infoMain>
          <div class="flex justify-between w-100%">
            <div class="w-40% text-center">
              <span class="text-13px">三事分流占比</span>
              <div id="ssflzb" style="width: 100%; height: 180px"></div>
            </div>
            <div class="w-60% text-center">
              <span class="text-13px">满意度占比</span>
              <div id="mydzb" style="width: 100%; height: 180px"></div>
            </div>
          </div>
        </template>
      </InfoDialog>
    </div>
    <div class="mt-19px" v-show="dialog">
      <InfoDialog :title="'乡村荣誉榜'" :height="222" :padding="'9px 25px'">
        <template #infoMain>
          <div class="flex justify-between">
            <div>
              <div class="flex flex-col items-center">
                <div class="zjc">
                  <span>最佳村</span>
                </div>
                <span class="text-13px text-#00BAFF">XXXX村</span>
              </div>
              <div class="flex flex-col items-center mt-14px">
                <div class="zjc">
                  <span>最佳村</span>
                </div>
                <span class="text-13px text-#00BAFF">XXXX村</span>
              </div>
            </div>
            <div class="flex flex-wrap justify-end">
              <div
                v-for="i in 4"
                :key="i"
                class="ml-6px"
                :class="{ 'mt-12px': i > 2 }"
              >
                <div class="zjry">
                  <span>最佳人员</span>
                </div>
                <div class="name">
                  <span>张**</span>
                  <span class="btn">网格员</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </InfoDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { xcfzData, xcfzList } from "../../config/topBtnPage";
// import TableList from "../TableList/index.vue";
import getAssets from "@/utils/getAssets";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const dialog = ref<boolean>(true);
let option: EChartsOption = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : ({d}%)", //鼠标放上去 展示内容
  },
  color: ["#36FFCC", "#FFDE2A", "#24AFFF"],
  series: [
    {
      name: "满意度占比",
      type: "pie",
      radius: "50%",
      data: [
        { value: 25, name: "游客" },
        { value: 15, name: "商户" },
        { value: 60, name: "村民" },
      ],
      label: {
        color: "#fff",
      },
      labelLine: {
        length: 5,
        length2: 3,
        maxSurfaceAngle: 30,
      },
    },
  ],
};
const seriesData = [
  { color: `#1EA6F4`, value: 93, name: "自家事" },
  { color: `#46FDFF`, value: 89, name: "大家事" },
  { color: `#36FFCC`, value: 92, name: "公家事" },
];
let option1: EChartsOption = {
  polar: {
    radius: ["60", "20%"],
  },
  angleAxis: {
    min: 0,
    max: 120,
    startAngle: 90,
    clockwise: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  radiusAxis: {
    type: "category",
    inverse: false,
    axisLabel: {
      inside: true,
      formatter(value) {
        return `${value}%`;
      },
      align: "left",
      margin: -5,
      interval: 0, // 强制显示所有
      color: "#fff",
    },
    axisTick: {
      show: false, // 是否显示坐标轴刻度
    },
    axisLine: {
      show: false, // 是否显示坐标轴轴线
    },
    z: 100,
    data: seriesData.map((item) => item.value),
  },
  series: [
    {
      type: "bar",
      data: seriesData.map((item) => item.value),
      coordinateSystem: "polar",
      itemStyle: {
        color(params) {
          return seriesData[params.dataIndex].color;
        },
      },
      labelLayout() {
        return {
          x: 60,
          y: 15,
          verticalAlign: "middle",
          align: "center",
        };
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "15",
          formatter: (params) => {
            return `{name|${seriesData[params.dataIndex].name}}{value|${
              seriesData[params.dataIndex].value
            }%}`;
          },
          rich: {
            value: {
              color: "inherit",
            },
            name: {
              color: "inherit",
            },
          },
        },
      },
      stack: "a",
    },
    {
      type: "bar",
      data: seriesData.map((item) => 75 - item.value),
      coordinateSystem: "polar",
      itemStyle: {
        color: "#E3F0FF",
      },
      emphasis: {
        disabled: true,
      },
      stack: "a",
    },
  ],
};

onMounted(() => {
  const chartDom = document.getElementById("mydzb")!;
  const myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
  const chartDom1 = document.getElementById("ssflzb")!;
  const myChart1 = echarts.init(chartDom1);
  option1 && myChart1.setOption(option1);
  window.onresize = function () {
    myChart.resize();
    myChart1.resize();
  };
});
</script>

<style lang="less" scoped>
.head {
  background: rgba(69, 124, 179, 0.2);
}
.left {
  position: absolute;
  padding-bottom: 20px;
  top: 150px;
  left: 44px;
  color: #fff;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100% - 170px);

  :deep(.zl_list) {
    tbody tr:hover > td {
      background-color: unset !important;
    }
    el-table__row > td {
      border: none;
    }
    &&::before {
      height: 0px;
    }
    th,
    td {
      border-bottom: none !important;
    }
    .cell {
      font-size: 12px;
      padding: 0;
    }
    .el-table__header .el-table__cell {
      background-color: rgba(91, 117, 151, 1);
      color: #fff;
    }

    .el-table__body .el-table__row {
      color: #b0cfdf;
      background-color: rgba(83, 103, 135, 1);
    }
  }
  .zjc {
    width: 125px;
    height: 74px;
    background: url(../../../assets//img/zjc.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 6px;
    position: relative;
    span {
      position: absolute;
      bottom: 0;
      left: 50%;
      font-size: 12px;
      transform: scale(0.6) translate(-65%, 10%);
    }
  }
  .zjry {
    width: 78px;
    height: 67px;
    background: url(../../../assets//img/zjc.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom: 12px;
    position: relative;
    span {
      position: absolute;
      bottom: -2%;
      left: 25%;
      font-size: 12px;
      transform: scale(0.6);
    }
  }
  .name {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      border: 1px solid #02aaea;
      border-radius: 2px;
      background: rgba(2, 170, 234, 0.3);
      font-size: 12px;
      transform: scale(0.75);
      padding: 2px 6px;
    }
  }
}

.left::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
// .left::-webkit-scrollbar {
//   width: 5px;
//   background-color: transparent;
// }
// /*定义滚动条轨道：内阴影+圆角*/
// .left::-webkit-scrollbar-track {
//   background-color: transparent;
// }
// /*定义滑块：内阴影+圆角*/
// .left::-webkit-scrollbar-thumb {
//   border-radius: 5px;
//   background-color: #586f90;
// }
</style>
