<template>
  <div class="w-100vw h-100vh overflow-hidden">
    <!-- cesium画布元素 -->
    <div id="cesiumContainer"></div>
    <!-- 底部经纬度信息 -->
    <div class="location">
      <div
        class="h-4vh w-100% leading-4vh bg-[#000] text-[#707070] text-32px px-34px"
      >
        浙江元数科技有限公司
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CesiumInit from "@/utils/cesium/CesiumInit";
// 初始化cesium
const initCesium = async () => {
  const cesium = new CesiumInit();
  cesium.divGraphic.showDivGraphic("all", [
    {
      name: "交通设施",
      menuType: "jtss",
      eventType: "marker",
    },
    {
      name: "政府机构",
      menuType: "zfjg",
      eventType: "marker",
    },
    {
      name: "配套设施",
      menuType: "ptss",
      eventType: "marker",
    },
    {
      name: "商超点位",
      menuType: "scdw",
      eventType: "marker",
    },
    {
      name: "旅游景点",
      menuType: "lyjd",
      eventType: "marker",
    },
    {
      name: "其它",
      menuType: "qtdw",
      eventType: "marker",
    },
  ]);
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
  bottom: 1px;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
