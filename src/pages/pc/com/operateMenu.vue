<template>
  <!-- 场景切换选项 -->
  <div class="menuBox">
    <template v-if="props.manyClass">
      <div class="checkbox" v-for="(i, idx) in toolMenu" :key="idx">
        <el-checkbox
          v-model="i.check"
          :indeterminate="i.isInd"
          @change="handleChange(i, $event)"
          >{{ i.name }}</el-checkbox
        >
        <template v-if="i.child">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox
              v-for="is in i.child"
              :key="is.name"
              :label="is.menuType"
              @change="handleCitiesChange(i, is, $event)"
              >{{ is.name }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
      </div>
    </template>
    <template v-else-if="props.chooseType == 'checkbox'">
      <div class="checkbox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ toolMenu.name }}</el-checkbox
        >
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="i in toolMenu.child"
            :key="i.name"
            :label="i.menuType"
            >{{ i.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </template>
    <template v-else>
      <div
        v-for="i in toolMenu"
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
const activeBtn = ref<any>(); //当前点击的按钮

interface detailProps {
  toolMenu: any; //tool菜单
  chooseType: string; //类型：单选--多选
  manyClass: boolean; //是否多个单选框组
}
const props = withDefaults(defineProps<detailProps>(), {
  chooseType: "raido",
  manyClass: false,
});

const toolMenu = ref<any>(props.toolMenu);
const checkAll = ref<boolean>(false); //全部
const isIndeterminate = ref<boolean>(false); //中间状态
const checkedCities = ref<any[]>([]); //选中的值
const cities: any = []; //选项值长度 用来判断是否全部选中

let mars3dAdd: any,
  measure: any,
  addScene: any,
  mapEvent: any,
  drawUnit: any,
  divGraphic: any; //用来存储上一次点击的name值
// 初始化数据
const initData = () => {
  mars3dAdd = window.cesium.mars3dAdd;
  measure = window.cesium.measure;
  addScene = window.cesium.addScene;
  mapEvent = window.cesium.mapEvent;
  drawUnit = window.cesium.drawUnit;
  divGraphic = window.cesium.divGraphic;

  if (props.manyClass) {
    toolMenu.value.forEach((i) => {
      i.child &&
        i.child.forEach((j: any) => {
          i.cities.push(j.menuType);
        });
    });
  }
  // 初始化选项值
  toolMenu.value.child &&
    toolMenu.value.child.forEach((i: any) => {
      cities.push(i.menuType);
    });
};
const changeViews = (val, billArr: string[] = []) => {
  activeBtn.value = activeBtn.value == val.menuType ? "" : val.menuType;
  switch (val.eventType) {
    case "showAll":
      mars3dAdd.deleteFn();
      const child = props.manyClass ? val.child : toolMenu.value.child;
      if (props.manyClass) {
        mars3dAdd.showBillboard(val.menuType, val.child);
        divGraphic.showDivGraphic(val.menuType, val.child);
      } else {
        mars3dAdd.showBillboard(val.menuType, toolMenu.value.child);
        divGraphic.showDivGraphic(val.menuType, toolMenu.value.child);
      }
      child.forEach((i) => {
        if (i.eventType == "geojson") {
          mars3dAdd.addGeoJsonLayer({
            data: i.url,
            outCol: i.lineColor,
            color: i.polygonColor,
            outWid: 1,
            randCol: i.polygonColor == "manyColor" ? true : false,
          });
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
      if (billArr.length > 0) {
        mars3dAdd.showBillboard(null, billArr);
        divGraphic.showDivGraphic(null, billArr);
      } else {
        mars3dAdd.showBillboard(val.menuType); //显示指定类型的marker点
        divGraphic.showDivGraphic(val.menuType);
      }
      val.changeName && addScene.changeViews(val.changeName); //跳转至点视角
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
      divGraphic.showDivGraphic();
      mars3dAdd.showBillboard(); //隐藏所有点位
      mars3dAdd.deleteFn(); //删除所有线面
      if (val.geoType == "polygonLine") {
        mars3dAdd.addGeoJsonLayer({
          data: val.url,
          outCol: val.lineColor,
          color: val.polygonColor,
          outWid: 1,
          randCol: val.polygonColor == "manyColor" ? true : false,
        });
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
// 单个多选框 全选事件
const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
  if (val) {
    //如果是全选 执行加载全部数据
    changeViews(toolMenu.value);
  } else {
    mars3dAdd.deleteFn();
    mars3dAdd.showBillboard();
    divGraphic.showDivGraphic();
  }
};
// 单个多选框 子集选择事件
const handleCheckedCitiesChange = (value: string[]) => {
  mars3dAdd.deleteFn();
  if (value.includes("wghf")) {
    changeViews(toolMenu.value.child[0]);
  }
  changeViews({ eventType: "marker" }, value); //显示选中的marker
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
// 多个多选框 全选事件
const handleChange = (i, val: boolean) => {
  i.check = val;
  if (!val) i.isInd = val; //去除中间状态
  const childrenArray = i?.child || [
    { menuType: i.childMenuType, eventType: "marker" },
  ];
  //这里注意是选取一级下的二级数据
  if (val == true) {
    // 判断是否有子集
    for (let i = 0; i < childrenArray.length; i++) {
      checkedCities.value.push(childrenArray[i].menuType);
    }
    //如果是全选 执行加载全部数据
    changeViews({ eventType: "marker" }, checkedCities.value);
  } else {
    //取消全选删除重复的id
    checkedCities.value = checkedCities.value.filter(
      (item) => !childrenArray.some((e) => e.menuType === item)
    );
    mars3dAdd.deleteFn();
    mars3dAdd.showBillboard(null, checkedCities.value);
    divGraphic.showDivGraphic(null, checkedCities.value);
  }
};
// 多个多选框 子集选择事件  i:父级当前对象 idx:父级索引  is：当前child数组中的对象 value:选中的值
const handleCitiesChange = (i, is, value: string[]) => {
  const childrenArray = i?.child || []; //这里注意是选取一级下的二级数据
  let tickCount = 0,
    unTickCount = 0;
  const len = childrenArray.length;
  for (let j = 0; j < len; j++) {
    if (is.menuType == childrenArray[j].menuType)
      childrenArray[j].checked = value;
    if (childrenArray[j].checked == true) tickCount++;
    if (childrenArray[j].checked == false) unTickCount++;
  }
  if (tickCount == len) {
    //子级全勾选
    i.check = true;
    i.isInd = false;
  } else if (unTickCount == len) {
    //子级全不勾选
    i.check = false;
    i.isInd = false;
  } else {
    i.check = true;
    i.isInd = true; //添加不确定状态
  }
  mars3dAdd.deleteFn();
  changeViews({ eventType: "marker" }, checkedCities.value); //显示选中的marker
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
  align-items: flex-start;
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
