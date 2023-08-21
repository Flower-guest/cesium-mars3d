<template>
  <!-- 顶部搜索功能 -->
  <div v-show="isShowSearch" class="search">
    <el-input
      @input="onSearch"
      v-model="searchVal"
      placeholder="请输入需要搜索的地址"
    >
      <template #suffix>
        <el-button color="#2192A6" type="primary" round
          ><img
            class="w-16px h-16px mr-8px"
            :src="getAssets('icon_ss.png')"
          />搜索</el-button
        >
      </template>
    </el-input>
    <div v-show="suggestionList.length > 0" class="list">
      <template v-for="i in suggestionList" :key="i.id">
        <div
          class="flex flex-wrap justify-between items-center text-[#fff] py-15px px-5px cursor-pointer"
          @click="setSuggestion(i)"
        >
          <span class="text-14px mr-5px">{{ i.title }}</span>
          <span class="text-12px">{{ i.address }}</span>
        </div>
      </template>
    </div>
  </div>
  <!-- 划线功能按钮 -->
  <div class="draw_tool">
    <template v-for="i in btnTool[topClickType]" :key="i.active">
      <div class="tool_list" @click="toolClick(i)">
        <img
          class="ml-8px"
          :style="{ width: i.w + 'px', height: i.h + 'px' }"
          :src="getAssets(i.img)"
        />
        <span class="text-18px">{{ i.btnName }}</span>
        <img
          class="w-14px h-10px"
          :style="{
            width:activeBtn == i.active ? '14px' : '10px',
            height:activeBtn == i.active ? '10px' : '14px',
          opacity: isShowXL(toolMenu[i.btnType]) ? 1 : 0 }"
          :src="
            getAssets(activeBtn == i.active ? 'icon_xl1.png' : 'icon_xl2.png')
          "
        />
      </div>
      <!-- 场景切换选项 -->
      <template v-if="isShowXL(toolMenu[i.btnType])">
        <OperateMenu
          v-show="activeBtn == i.active"
          :choose-type="i?.chooseType"
          :tool-menu="toolMenu[i.btnType]"
        />
      </template>
    </template>
  </div>
  <!-- 全景与卫星切换 -->
  <div class="vr cursor-pointer">
    <div
      class="relative w-168x h-100%"
      @click="showMarker({ billboardType: 3 })"
    >
      <div class="qjdw">
        <img :src="getAssets('icon-qjdw.png')" />
      </div>
      <img class="w-100% h-100%" :src="getAssets('qj.png')" />
      <div class="dt bg-#1F8AAA">全景</div>
    </div>
  </div>
  <!-- 右侧线面编辑窗口 -->
  <GraphicEditor />
</template>

<script setup lang="ts">
import OperateMenu from "./operateMenu.vue";
import GraphicEditor from "./graphicEditor/index.vue";
import * as Cesium from "cesium";
import { btnTool, toolMenu } from "../config/rigthPage";
import getAssets from "@/utils/getAssets";
import Coordtransform from "@/utils/cesium/Coordtransform";
import { debounce } from "@/utils/throttle";
import { useTopTypeStore } from "@/store";

const TMap = (window as any).TMap;
const topTypeStore = useTopTypeStore();
const activeBtn = ref<any>(0); //当前点击的按钮
const showView = ref<boolean>(false); //是否显示切换镜头表单
const isShowSearch = ref<boolean>(false); //是否显示搜索
const searchVal = ref<string>(""); //搜索框输入值
const suggestionList = ref<any>([]); //地址搜索出来的列表
const topClickType = ref<string>(topTypeStore.TopClickType); //顶部页面点击选择类型
const glType = ref<string>(""); //点击资产按钮类型  add | delete | edit

let addScene, suggest;

watch(
  () => topTypeStore.TopClickType,
  (newVal) => {
    topClickType.value = newVal;
  }
);
const isShowXL = computed(() => (item: any) => {
  //计算属性传递参数
  return item ? true : false;
});

const emit = defineEmits(["showMarker"]);

// tool点击功能 hasLength:是否需要展示长度
const toolClick = (i) => {
  addScene = window.cesium.addScene;
  activeBtn.value = activeBtn.value == i.active ? "" : i.active;
  switch (i.btnType) {
    case "qjdw":
      console.log("qjdw");
      break;
    case "wzss":
      showView.value = false;
      isShowSearch.value = !isShowSearch.value;
      break;
    case "jgqxw":
      showView.value = false;
      window.open("https://www.jgqxw.com/index/user/index.html", "_blank");
      break;
    default:
      if (!showView.value) showView.value = true;
      break;
  }
};
// 展示对应marker
const showMarker = (e) => {
  if (e.active == activeBtn.value && e.views) addScene.changeViews(e.views);
  emit("showMarker", e.billboardType);
};

// 初始化搜索类
const initSearch = () => {
  suggest = new TMap.service.Suggestion({ pageSize: 8 });
};
// 搜索事件
const onSearch = debounce((value: string | number) => {
  if (value) {
    suggest.getSuggestions({ keyword: value }).then((result) => {
      // 以当前所输入关键字获取输入提示
      suggestionList.value = result.data;
    });
  } else {
    suggestionList.value = [];
  }
});
// 搜索值点击事件
const setSuggestion = (val) => {
  suggestionList.value = [];
  const location = Coordtransform.gcj02ToWgs84(
    val.location.lng,
    val.location.lat
  );
  addScene.cameraFlyTo(
    Cesium.Cartesian3.fromDegrees(location[0], location[1], 500)
  );
  searchVal.value = "";
};

onMounted(async () => {
  await initSearch();
});

defineExpose({
  activeBtn,
  glType,
});
</script>

<style lang="less" scoped>
.activeText {
  color: #00ffff !important;
}

.vr {
  position: absolute;
  height: 124px;
  right: 130px;
  bottom: 56px;
  border-radius: 4px;
  display: flex;

  .qjdw {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 33px;
      height: 24px;
    }
  }
  .dt {
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    right: 0;
    padding: 1px 5px 1px 8px;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    border-radius: 4px 0px 4px 0px;
  }
}
.search {
  position: absolute;
  left: 50%;
  top: 112px;
  z-index: 1;
  height: 47px;
  width: 480px;
  transform: translate(-50%, 0px);
  :deep(.el-input) {
    width: 100%;
    height: 45px;
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
}
.draw_tool {
  position: absolute;
  right: 28px;
  top: 132px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .tool_list {
    height: 51px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 164px;
    margin-bottom: 21px;
    padding: 11px 11px 9px 8px;
    box-sizing: border-box;
    cursor: pointer;
    background: url("../../assets/img/btn-bg.png") no-repeat;
    background-size: 100% 100%;
    font-family: "USTitleBlack";
  }
}
.list {
  background: url("../../assets/img/sugges-list-bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
