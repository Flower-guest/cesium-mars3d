<template>
  <!-- 场景切换选项 -->
  <div class="menuBox">
    <template v-if="props.manyClass">
      <div class="checkbox" v-for="(i, idx) in props.toolMenu" :key="idx">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ i }}</el-checkbox
        >
        <!-- <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="(i, idx) in props.toolMenu"
            :key="i.name"
            :label="i.menuType"
            v-show="idx !== 0"
            >{{ i.name }}</el-checkbox
          >
        </el-checkbox-group> -->
      </div>
    </template>
    <template v-else-if="props.chooseType == 'checkbox'">
      <div class="checkbox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ props.toolMenu[0].name }}</el-checkbox
        >
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="(i, idx) in props.toolMenu"
            :key="i.name"
            :label="i.menuType"
            v-show="idx !== 0"
            >{{ i.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </template>
    <template v-else>
      <div
        v-for="i in props.toolMenu"
        :key="i.name"
        class="raido"
        :class="{ activeText: activeBtn == i.menuType ? true : false }"
        @click="changeViews(i)"
      >
        {{ i.name }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import LocalCache from "@/utils/cache";
import { dJSON } from "@/utils/cesium/config/cesiumConfig";
const activeBtn = ref<any>(); //当前点击的按钮

interface detailProps {
  toolMenu: any;
  chooseType: string;
  manyClass: boolean;
}
const props = withDefaults(defineProps<detailProps>(), {
  chooseType: "raido",
  manyClass: false,
});
const checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(true);
const checkedCities = ref<any[]>([]);
const cities: any = [];

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
      addScene.showBillboard(val.menuType, props.toolMenu);
      props.toolMenu.forEach((i) => {
        if (i.eventType == "geojson") {
          addLinePrimitive(i);
        }
      });
      addScene.changeViews(val.changeName);
      break;
    case "measure":
      measure.measureStart(val.menuType, () => {
        activeBtn.value = 0;
      });
      break;
    case "marker":
      addScene.showBillboard(val.menuType); //显示指定类型的marker点
      val.changeName && addScene.changeViews(val.changeName); //跳转至点视角
      mars3dAdd.deleteFn(); //删除线、面
      break;
    case "addMarker":
      const markerType = val.addMarkerType;
      const img = markerType == "afd" ? "mk_jk.png" : "mk_fz.png";
      //添加资产
      if (val.menuType == "xz") {
        LocalCache.setCache("glType", "add");
        mapEvent.getCartographic((val) => {
          if (val) {
            addScene.addBillboard(
              val.lng,
              val.lat,
              val.alt,
              img,
              "",
              "rgba(0,250,154,0.5)",
              {
                type: "xz",
                addMarkerType: markerType,
                url: img,
                isClick: true,
                eventType: "showTable",
              },
              true,
              50,
              60
            );
          }
          activeBtn.value = "";
        });
      } else if (val.menuType == "sc") {
        //删除资产
        LocalCache.setCache("glType", "delete");
        mapEvent.getCartographic((...val: any[]) => {
          const type =
            val[1]?.id?.properties?.info?._value?.addMarkerType || null;
          if (type == markerType) {
            let markerInfo = LocalCache.getCache("markerInfo") || [];
            if (markerInfo.length > 0) {
              markerInfo = markerInfo.filter((i) => i.id !== val[1].id.id);
              LocalCache.setCache("markerInfo", markerInfo);
            }
            addScene.removeBillboard(val[1].id);
          } else {
            ElMessage.error("删除失败");
          }
          activeBtn.value = "";
          LocalCache.setCache("glType", "");
        });
      } else if (val.menuType == "bj") {
        LocalCache.setCache("glType", "edit");
        activeBtn.value = 0;
      } else {
        console.log("ss");
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
    const option = properties?.style
      ? { positions: geometry.coordinates, style: properties.style }
      : {
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
        };
    mars3dAdd.addPolylinePrimitive(option);
  }
};

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
  changeViews(props.toolMenu[0]);
};
const handleCheckedCitiesChange = (value: string[]) => {
  console.log(value);
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

onMounted(() => {
  nextTick(() => {
    initData();
  });
});
</script>

<style lang="less" scoped>
.menuBox {
  margin-top: -24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  color: #dae5e6;
  width: 164px;
  padding: 14px 14px 8px;
  background: url("../../assets/img/sugges-list-bg.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
  :deep(.checkbox) {
    .el-checkbox-group {
      margin-left: 13px;
    }
    .is-indeterminate {
      background-color: transparent;
      border-color: #13879c;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: #00ffff;
    }
    .el-checkbox {
      color: #fff;
      .el-checkbox__inner {
        background-color: transparent;
        border-color: #13879c;
      }
    }
    .is-checked {
      .el-checkbox__label {
        color: #fff;
      }
      .el-checkbox__inner {
        background-color: transparent;
        border-color: #13879c;
      }
      .el-checkbox__inner::after {
        border: 1px solid #00ffff;
        border-left: 0;
        border-top: 0;
      }
    }
  }
  .raido {
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 8px 0;
    font-size: 14px;
    color: #fff;
    position: relative;
    &:hover::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 100%;
      height: 8px;
      background: url(../../assets/img/icon_gy.png) no-repeat left center/100%
        auto;
    }
  }
  .activeText {
    color: #00ffff !important;
  }
}
</style>
