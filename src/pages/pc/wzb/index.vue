<template>
  <div class="w-100vw h-100vh overflow-hidden">
    <!-- cesium画布元素 -->
    <div id="cesiumContainer"></div>
    <!-- 顶部页面 -->
    <TopPage />
    <!-- 右边页面 -->
    <RightPage
      :btn-tool="wzbBtnTool"
      :tool-menu="wzbToolMenu"
      @show-marker="showMarker"
      ref="rightPage"
    />
    <!-- 表单弹窗 -->
    <TableInfo
      :table-info="tableInfo"
      :show-table="showTable"
      @update:show-table="showTable = $event"
    />
    <!-- billboard信息框 -->
    <BillboardInfo
      :popup-info="popupInfo"
      :show-billboard="showBillboard"
      @update:show-billboard="showBillboard = $event"
    />
    <!-- webview组件 -->
    <WebViewPage
      v-if="toPageUrl"
      :to-page-url="toPageUrl"
      :show-iframe="showIframe"
      @update:show-iframe="showIframe = $event"
    />
    <!-- 底部经纬度信息 -->
    <div class="location">
      <div
        class="h-30px w-300px leading-30px bg-[#000] text-[#707070] text-16px px-34px"
      >
        浙江元数科技有限公司
      </div>
      <div v-show="cartesian3">
        经度：{{ cartesian3?.lng }} 纬度：{{ cartesian3?.lat }} 海拔：{{
          cartesian3?.h
        }}米
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as mars3d from "mars3d";
import TopPage from "../com/topPage.vue";
import RightPage from "../com/rightPage.vue";
import TableInfo from "../com/tableInfo.vue"; //建筑物表单信息或监控弹窗显示页面
import BillboardInfo from "../com/billboardInfo.vue";
import CesiumInit from "@/utils/cesium/CesiumInit";
import { wzbBtnTool, wzbToolMenu } from "../config/rigthPage";
import { getMapMarkerSort } from "@/service/api";

const toPageUrl = ref<any>(
  "https://www.jgqxw.com/index/tour/show/vid/23cc2027da9f65f6"
); //跳转全景默认地址
const showTable = ref<boolean>(false); //是否展示表单
const tableInfo = ref<any>(); //点击建筑物table数据
const isPoly = ref<boolean>(false); //是否在绘制测量
const showIframe = ref<boolean>(false); //是否显示iframe
const popupInfo = ref<any>(); //billboard点击弹窗信息
const showBillboard = ref<boolean>(false); //是否展示billboard表单
const cartesian3 = ref<any>(); //点击目标位置x、y、z坐标值
const rightPage = ref<any>();

let cesium, mapEvent, divGraphic, mars3dAdd;

// 获取右侧功能按钮菜单
const initBtnTool = async () => {
  const btnTool = await getMapMarkerSort();
  console.log(btnTool);
};
// 初始化cesium
const initCesium = () => {
  cesium = window.cesium = new CesiumInit();
  divGraphic = cesium.divGraphic; //添加场景对象
  mapEvent = cesium.mapEvent; //cesium事件对象
  mars3dAdd = cesium.mars3dAdd; //cesium事件对象
  // 添加点击事件回调函数
  mapEvent.addClick((info, type) => showInfoTable(info, type));
  divGraphic.graphicLayer.on(mars3d.EventType.click, function (event) {
    const attr = event.graphic.attr;
    if (attr.zhaoshang == 1) {
      showInfoTable({ ...attr, type: "cy" }, "showTable");
    } else if (attr.zhaoshang == 0) {
      showInfoTable({ ...attr, type: "zs" }, "showTable");
    }
  });
  mars3dAdd.billboard.on(mars3d.EventType.click, function (event) {
    const attr = event.graphic.attr;
    showInfoTable(attr, "billboard");
  });
};
// 展示与隐藏 全景按钮
const showMarker = () => {
  toPageUrl.value =
    "https://www.jgqxw.com/index/tour/show/vid/49c1eea3e6ffd782"; //跳转全景默认地址
  showIframe.value = true;
};
// 模型点击展示表单 info:点击模型返回的信息  type：模型类型
const showInfoTable = (info, type) => {
  if (!isPoly.value) {
    cartesian3.value = info.cartographic;
    //如果在使用划线功能就不展示弹窗
    switch (type) {
      case "showTable":
        showTable.value = true;
        tableInfo.value = info;
        break;
      case "billboard":
        showBillboard.value = true;
        popupInfo.value = info;
        break;
    }
  }
};
onMounted(() => {
  initBtnTool();
  initCesium();
});
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.location {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
