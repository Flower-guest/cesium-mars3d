<template>
  <!-- 顶部搜索功能 -->
  <div v-show="isShowSearch" class="search">
    <el-input
      @input="onSearch"
      v-model="searchVal"
      placeholder="请输入需要搜索的地址"
      :suffix-icon="Search"
    />
    <div v-show="suggestionList.length > 0" class="list">
      <template v-for="i in suggestionList" :key="i.id">
        <div
          class="flex flex-wrap justify-between items-center bg-#fff py-15px px-5px cursor-pointer"
          @click="setSuggestion(i)"
        >
          <span class="text-14px mr-5px">{{ i.title }}</span>
          <span class="text-12px text-#666">{{ i.address }}</span>
        </div>
      </template>
    </div>
  </div>
  <!-- 划线功能按钮 -->
  <div class="draw_tool">
    <template v-for="i in btnTool[topClickType]" :key="i.active">
      <div
        class="tool_list"
        :class="{ activeText: activeBtn == i.active ? true : false }"
        @click="toolClick(i)"
      >
        <!-- <img
          v-if="i?.img1"
          class="w-16px h-17px mr-8px"
          :src="getAssets(activeBtn == i.active ? i.img2 : i.img1)"
        /> -->
        {{ i.btnName }}
      </div>
      <!-- 场景切换选项 -->
      <OperateMenu
        v-show="activeBtn == i.active"
        :tool-menu="toolMenu[i.btnType]"
      />
    </template>
  </div>
  <!-- 全景与卫星切换 -->
  <div class="vr cursor-pointer">
    <div
      class="relative w-140px h-100% mr-12px"
      @click="showMarker({ billboardType: 3 })"
    >
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
import { Search } from "@element-plus/icons-vue";
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


const emit = defineEmits(["showMarker", "addPoly"]);

// tool点击功能 hasLength:是否需要展示长度
const toolClick = (i) => {
  addScene = window.cesium.addScene;
  activeBtn.value = activeBtn.value == i.active ? "" : i.active;
  switch (i.btnType) {
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
.activeBtn {
  background: rgb(120, 189, 61) !important;
}

.activeText {
  color: #00ffff !important;
}

.vr {
  position: absolute;
  height: 90px;
  right: 130px;
  bottom: 56px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;
  display: flex;

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
  top: 132px;
  z-index: 1;
  height: 45px;
  min-width: 200px;
  transform: translate(-50%, 0px);
  .el-input {
    height: 45px;
  }
}
.draw_tool {
  position: absolute;
  width: 140px;
  right: 28px;
  top: 132px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .tool_list {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 100%;
    margin-bottom: 8px;
    padding: 8px 0;
    cursor: pointer;
    background-color: rgba(40, 70, 93, 0.8);
    border: 1px solid rgba(187, 187, 187, 0.6);
  }
}
</style>
