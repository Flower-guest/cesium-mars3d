<template>
  <!-- 场景切换选项 -->
  <div class="menuBox">
    <template v-for="i in props.toolMenu" :key="i.name">
      <div
        class="menu"
        :class="{ activeText: activeBtn == i.menuType ? true : false }"
        @click="changeViews(i)"
      >
        {{ i.name }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import LocalCache from "@/utils/cache";
import { dJSON } from "@/utils/cesium/config/cesiumConfig";
const activeBtn = ref<any>(); //当前点击的按钮

interface detailProps {
  toolMenu: any;
}
const props = defineProps<detailProps>();

let mars3dAdd: any, measure: any, addScene: any, mapEvent: any, drawUnit: any; //用来存储上一次点击的name值
// 初始化数据
const initData = () => {
  mars3dAdd = window.cesium.mars3dAdd;
  measure = window.cesium.measure;
  addScene = window.cesium.addScene;
  mapEvent = window.cesium.mapEvent;
  drawUnit = window.cesium.drawUnit;
};
const changeViews = (val) => {
  activeBtn.value = activeBtn.value == val.menuType ? "" : val.menuType;
  switch (val.eventType) {
    case "showAll":
      mars3dAdd.deleteFn();
      // addScene.tempCollectionRemove();
      addScene.showBillboard(val.menuType, props.toolMenu);
      addScene.changeViews("LHS");
      addLinePrimitive(props.toolMenu[1]);
      console.log("showAll");
      break;
    case "measure":
      measure.measureStart(val.menuType, () => {
        activeBtn.value = 0;
      });
      break;
    case "marker":
      addScene.showBillboard(val.menuType); //显示指定类型的marker点
      val.changeName && addScene.changeViews(val.changeName); //跳转至点视角
      mars3dAdd.deleteFn(); //删除线更面
      // addScene.tempCollectionRemove(); //删除
      console.log("marker");
      break;
    case "addMarker":
      //添加资产
      if (val.menuType == "xzzc") {
        LocalCache.setCache("glType", "add");
        mapEvent.getCartographic((val) => {
          if (val) {
            addScene.addBillboard(
              val.lng,
              val.lat,
              val.alt,
              "mk_zs.png",
              "",
              "rgba(0,250,154,0.5)",
              {
                type: "xzzc",
                url: "mk_fz.png",
                isClick: true,
                eventType: "showTable",
              },
              true,
              50,
              90
            );
          }
          activeBtn.value = "";
        });
      } else if (val.menuType == "sczc") {
        //删除资产
        LocalCache.setCache("glType", "delete");
        mapEvent.getCartographic((...val) => {
          const type = val[1]?.id?.properties?.info?._value?.type || null;
          if (type == "xzzc") {
            let markerInfo = LocalCache.getCache("markerInfo") || [];
            if (markerInfo.length > 0) {
              markerInfo = markerInfo.filter((i) => i.id !== val[1].id.id);
              LocalCache.setCache("markerInfo", markerInfo);
            }
            addScene.removeBillboard(val[1].id);
          }
          activeBtn.value = "";
          LocalCache.setCache("glType", "");
        });
      } else {
        LocalCache.setCache("glType", "edit");
        activeBtn.value = 0;
      }
      break;
    case "geojson":
      addScene.showBillboard(); //隐藏所有点位
      mars3dAdd.deleteFn(); //删除所有线面
      if (val.geoType == "polygonLine") {
        const index = dJSON.findIndex((i) => i.name == val.name);
        mars3dAdd.addGeoJsonLayer({
          data: dJSON[index].url,
          outCol: dJSON[index].lineColor,
          color: dJSON[index].polygonColor,
          outWid: 1,
          randCol: dJSON[index].polygonColor == "manyColor" ? true : false,
        });
      } else if (val.geoType == "line") {
        addLinePrimitive(val);
      }
      addScene.changeViews(val.changeName);
      break;
    case "draw":
      drawUnit.draw(val.menuType, () => {
        activeBtn.value = 0;
      });
      break;
  }
};
// 新增线
const addLinePrimitive = (val) => {
  const res: any = val.lineUrl;
  for (let i = 0; i < res.features.length; i++) {
    const { properties, geometry } = res.features[i];
    mars3dAdd.addPolylinePrimitive({
      positions: geometry.coordinates,
      width: 8,
      color: properties.color,
      di: true,
      diFar: 200000,
      label: {
        text: properties.name,
        color: properties.color,
        clamp: true,
        fs: 18,
        addHeight: 20,
        vD: false,
        bg: true,
        di: true,
        diFar: 200000,
      },
    });
  }
};
onMounted(() => {
  nextTick(() => {
    initData();
  });
});
</script>

<style lang="less" scoped>
.menuBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .menu {
    width: 80%;
    text-align: center;
    cursor: pointer;
    background-color: rgba(40, 70, 93, 0.8);
    border: 1px solid rgba(187, 187, 187, 0.6);
    margin-bottom: 4px;
    padding: 8px 6px;
    font-size: 12px;
  }
  .activeText {
    color: #00ffff !important;
  }
}
</style>
