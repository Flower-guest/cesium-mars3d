<template>
  <div class="w-100vw h-100vh overflow-hidden">
    <!-- cesium画布元素 -->
    <div id="cesiumContainer"></div>
    <!-- 顶部页面 -->
    <TopPage />
    <!-- 右边页面 -->
    <RightPage
      @show-marker="showMarker"
      @add-poly="addPoly"
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
      :b-position="bPosition"
      @update:show-billboard="showBillboard = $event"
    />
    <!-- webview组件 -->
    <WebViewPage
      :to-page-url="toPageUrl"
      :show-iframe="showIframe"
      @update:show-iframe="showIframe = $event"
    />
    <!-- 底部经纬度信息 -->
    <div class="location">
      <img
        class="h-30px w-130px mr-10px"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
      />
      <div v-show="cartesian3">
        经度：{{ cartesian3?.lng }} 纬度：{{ cartesian3?.lat }} 海拔：{{
          cartesian3?.h
        }}米
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopPage from "./com/topPage.vue";
import RightPage from "./com/rightPage.vue";
import TableInfo from "./com/tableInfo.vue"; //建筑物表单信息或监控弹窗显示页面
import BillboardInfo from "./com/billboardInfo.vue";
import CesiumInit from "@/utils/cesium/CesiumInit";
import LocalCache from "@/utils/cache";

const toPageUrl = ref<string>(
  "https://www.jgqxw.com/index/tour/show/vid/23cc2027da9f65f6"
); //跳转全景默认地址
const showTable = ref<boolean>(false); //是否展示表单
const tableInfo = ref<any>(); //点击建筑物table数据
const isPoly = ref<boolean>(false); //是否在绘制测量
const showIframe = ref<boolean>(false); //是否显示iframe
const popupInfo = ref<any>(); //billboard点击弹窗信息
const bPosition = ref<any>({ x: 0, y: 0 }); //billboard点击弹窗位置
const showBillboard = ref<boolean>(false); //是否展示billboard表单
const cartesian3 = ref<any>(); //点击目标位置x、y、z坐标值
const rightPage = ref<any>();

let cesium, measure, mapEvent, addScene;
// 初始化cesium
const initCesium = async () => {
  cesium = window.cesium = new CesiumInit();
  measure = cesium.measure; //划线功能对象
  addScene = cesium.addScene; //添加场景对象
  mapEvent = cesium.mapEvent; //cesium事件对象
  // 添加点击事件回调函数
  mapEvent.addClick((info, type) => showInfoTable(info, type));
  // 单体化鼠标移动高亮
  mapEvent.addBuildMove((primitive) => highLightBuild(primitive));
  // 在每一帧渲染完成后，监测一个物体在屏幕中的位置是否发生变化
  mapEvent.scenePostRender((position) => changeBillboardPos(position));
};
// 添加绘制
const addPoly = (val, hasLength) => {
  isPoly.value = val == "clearAllDrawn" ? false : true;
  measure.draw(val, hasLength, overDraw);
};
// 结束绘制
const overDraw = () => {
  isPoly.value = false;
  rightPage.value.activeBtn = 0;
};
// 展示与隐藏marker val:1:房屋信息 2:招商信息 3:全景按钮
const showMarker = (val) => {
  if (val !== 3) {
    showBillboard.value = false;
    addScene.showBillboard(val);
  } else if (val == 7) {
    //高觉田园新村民计划场景按钮
    rightPage.value.activeBtn = 0;
  } else {
    toPageUrl.value =
      "https://www.jgqxw.com/index/tour/show/vid/49c1eea3e6ffd782"; //跳转全景默认地址
    showIframe.value = true;
  }
};
// 模型点击展示表单 info:点击模型返回的信息  type：模型类型
const showInfoTable = (info, type) => {
  if (!isPoly.value) {
    cartesian3.value = info.cartographic;
    //如果在使用划线功能就不展示弹窗
    switch (type) {
      case "build":
        showTable.value = true;
        tableInfo.value = info.infoVal;
        break;
      case "showTable":
        const gltype = LocalCache.getCache("glType") || "";
        // const gltype = rightPage.value.glType;
        //如果为删除就不执行下面
        if (gltype == "delete" || gltype == "add") {
          return;
        } else if (gltype == "edit" && info.infoVal.type == "xzzc") {
          // rightPage.value.activeBtn = 0; //取消编辑资产按钮高亮
          // rightPage.value.glType = ""; //将管理状态重置为新增
          LocalCache.setCache("glType", "");
        }
        showTable.value = true;
        tableInfo.value = { ...info.infoVal, gltype };
        break;
      case "billboard":
        showBillboard.value = true;
        popupInfo.value = info.infoVal;
        bPosition.value = info.picks;
        break;
      case "division":
        rightPage.value.divisionClick(info.infoVal);
        break;
    }
  }
};
// 鼠标移动建筑高亮 primitive:当前鼠标下单体化对象
const highLightBuild = (primitive) => {
  if (!isPoly.value) {
    //如果在使用划线功能就不展示高亮
    primitive.color = [31, 209, 149, 128];
  }
};
// 改变billboard弹窗的位置
const changeBillboardPos = (position) => {
  if (showBillboard.value) bPosition.value = position;
};
onMounted(() => {
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
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
