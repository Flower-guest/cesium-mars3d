<template>
  <div class="left">
    <div class="flex">
      <div v-show="dialog">
        <InfoDialog :title="'乡村简介'">
          <template #infoMain>
            <el-carousel height="202px" :interval="3000">
              <el-carousel-item v-for="item in xcjjImgList" :key="item">
                <img
                  @click="(showOverlayDialog = true), (showType = 'img')"
                  class="w-100% h-100%"
                  :src="getAssets(item)"
                />
              </el-carousel-item>
            </el-carousel>
            <div class="jjxq_text mt-21px">
              <div
                @click="(showOverlayDialog = true), (showType = 'text')"
                class="scroll_text"
              >
                {{ xcjjScrollText }}
              </div>
            </div>
          </template>
        </InfoDialog>
      </div>
      <img
        class="w-103px h-55px"
        @click="dialog = !dialog"
        :src="getAssets(dialog ? 'sq.png' : 'zk.png')"
      />
    </div>
    <div class="mt-28px" v-show="dialog">
      <InfoDialog :title="'乡村基本概况'" :height="319" :padding="'7px 12px'">
        <template #infoMain>
          <img class="w-100% h-74px mb-9px" :src="getAssets('jj-bg.png')" />
          <div class="srzc">
            <span>村年收入支出</span>
            <div class="bar_info">
              <div class="flex items-center mr-5px">
                <div class="w-17px h-6px bg-#CCC137 mr-5px"></div>
                经营性收入
              </div>
              <div class="flex items-center mr-5px">
                <div class="w-17px h-6px bg-#FF3B30 mr-5px"></div>
                总收入
              </div>
              <div class="flex items-center mr-5px">
                <div class="w-17px h-6px bg-#29ACCC mr-5px"></div>
                总支出
              </div>
            </div>
          </div>
          <div id="main" style="width: 100%; height: 200px"></div>
        </template>
      </InfoDialog>
    </div>
  </div>
  <div class="right" v-show="dialog">
    <InfoDialog :title="'最新资讯'" :height="211" :padding="'5px 12px'">
      <template #infoMain>
        <div>
          <img class="w-100% h-1px mb-10px" :src="getAssets('line.png')" />
          <div
            @click="(showOverlayDialog = true), (showType = 'list')"
            v-for="(item, idx) in xcjjList"
            :key="idx"
          >
            <div class="flex text-14px">
              <div
                class="w-27px h-17px mr-8px text-center"
                :style="{
                  backgroundImage: `url(${getAssets(`icon_0${idx + 1}.png`)}`,
                  backgroundSize: 'contain',
                }"
              >
                0{{ idx + 1 }}
              </div>
              "{{ item }}"
            </div>
            <img class="w-100% h-1px my-10px" :src="getAssets('line.png')" />
          </div>
        </div>
      </template>
    </InfoDialog>
  </div>
  <OverlayDialog v-show="showOverlayDialog">
    <template #overlayMain>
      <div class="overlayMain">
        <img
          @click="showOverlayDialog = false"
          class="float-right mt-30px mr-49px w-48px h-48px"
          :src="getAssets('gb4.png')"
        />
        <div v-if="showType == 'img'">
          <el-carousel class="mt-8% ml-8% w-80%" height="auto" :interval="3000">
            <el-carousel-item
              v-for="item in xcjjImgList"
              :key="item"
              class="aa"
            >
              <img
                @click="(showOverlayDialog = true), (showType = 'img')"
                class="w-100% h-100%"
                :src="getAssets(item)"
              />
            </el-carousel-item>
          </el-carousel>
          <!-- <el-image
            class="w-80% mt-8% ml-6%"
            :src="getAssets('img1.png')"
            lazy
          /> -->
        </div>
        <div v-else>
          <div class="mt-77px text-36px text-center">XXXX乡村简介</div>
          <div class="mt-32px px-49px text-24px leading-1">
            {{ xcjjOverlayMainText }}
          </div>
        </div>
      </div>
    </template>
  </OverlayDialog>
  <!-- <ChangeViews /> -->
</template>

<script lang="ts" setup>
// import ChangeViews from "./changeViews.vue";
import {
  xcjjList,
  xcjjScrollText,
  xcjjOverlayMainText,
  xcjjImgList,
} from "../../config/topBtnPage";
import getAssets from "@/utils/getAssets";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
const dialog = ref<boolean>(true); //可视化面板是否显示
const showOverlayDialog = ref<boolean>(false); //是否显示弹窗
const showType = ref<any>(); //弹窗显示类型

let xAxisData: string[] = ["2018", "2019", "2020", "2021", "2022"];
let data1: number[] = [2000, 2500, 2800, 1000, 3800];
let data2: number[] = [1000, 1500, 1400, 1000, 1000];
let data3: number[] = [2900, 2300, 2500, 2200, 3000];

let emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: "rgba(0,0,0,0.3)",
  },
};

let option: EChartsOption = {
  tooltip: {},
  xAxis: {
    data: xAxisData,
    name: "X Axis",
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false },
    axisLabel: {
      color: "#fff",
    },
  },
  yAxis: {
    axisLabel: {
      color: "#fff",
    },
  },
  series: [
    {
      name: "总收入",
      type: "bar",
      stack: "one",
      emphasis: emphasisStyle,
      data: data1,
      color: "#FF3B30",
    },
    {
      name: "经营性收入",
      type: "bar",
      stack: "one",
      emphasis: emphasisStyle,
      data: data2,
      color: "#CCC137",
    },
    {
      name: "总支出",
      type: "bar",
      stack: "two",
      emphasis: emphasisStyle,
      data: data3,
      color: "#29ACCC",
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
:deep(.el-carousel) {
  .el-carousel__arrow {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .el-carousel__indicators {
    display: none;
  }
}
.left {
  padding-bottom: 20px;
  position: absolute;
  top: 150px;
  left: 44px;
  color: #fff;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100% - 170px);
  .jjxq_text {
    height: 124px;
    text-indent: 2em;
    overflow: hidden;
  }

  .srzc {
    margin-bottom: 10px;
    background: url("../../../assets/img/zlgkbg.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 7px 13px;
    font-size: 14px;
  }

  .bar_info {
    font-size: 12px;
    transform: scale(0.75);
    display: flex;
    justify-content: flex-end;
  }
  .scroll_text {
    animation: scroll-text 15s linear infinite;
  }

  @keyframes scroll-text {
    0% {
      transform: translateY(2%);
    }

    100% {
      transform: translateY(-70%);
    }
  }
}

.right {
  top: 150px;
  position: absolute;
  right: 154px;
  color: #fff;
  font-size: 14px;
}
.overlayMain {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/img/overlay_dialog_bg.png") no-repeat;
  background-size: 100% 100%;
  width: 1200px;
  height: 690px;
  color: #fff;
  text-indent: 2em;
}
.aa {
  height: 490px;
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
