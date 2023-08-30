<template>
  <div v-show="showTable">
    <!-- 信息展示页面 -->
    <div class="overlayMain" v-if="tableInfo3 && tableInfo3.gltype != 'edit'">
      <div class="flex justify-between items-center mt-31px px-12px">
        <img
          @click="updateShowTable"
          class="w-23px h-32px ml-7px"
          :src="getAssets('icon_xxmb.png')"
        />
        <div class="text-23px">{{ tableInfo3.name }}</div>
        <img
          @click="updateShowTable"
          class="w-20px h-20px"
          :src="getAssets('gb3.png')"
        />
      </div>
      <div class="my-10px pl-19px text-[#333] text-16px">
        <div>
          <el-carousel
            class="w-100% mt-34px"
            height="auto"
            indicator-position="none"
          >
            <el-carousel-item class="aa" v-if="tableInfo3?.vr">
              <div class="relative" @click="() => (showIframe = true)">
                <img
                  class="w-100%"
                  src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
                />
                <img class="qj_icon" :src="getAssets('icon-qj.png')" />
              </div>
            </el-carousel-item>
            <el-carousel-item class="aa">
              <img
                class="w-100%"
                src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
              />
            </el-carousel-item>
            <el-carousel-item class="aa">
              <img
                class="w-100%"
                src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="relative">
          <Tab :tab-panes="tabPanes" :row-list="rowList" />
          <span class="absolute top-3% right-0 text-18px text-[#E0E02D]"
            >12000/年</span
          >
        </div>
      </div>
    </div>
    <!-- 产业信息展示页面 -->
    <div class="overlayMain" v-else-if="tableInfo4">
      <div class="flex justify-between items-center mt-31px px-12px">
        <img
          @click="updateShowTable"
          class="w-23px h-32px ml-7px"
          :src="getAssets('icon_xxmb.png')"
        />
        <div class="text-23px">{{ tableInfo4.name }}</div>
        <img
          @click="updateShowTable"
          class="w-20px h-20px"
          :src="getAssets('gb3.png')"
        />
      </div>
      <div class="my-10px px-10px text-[#333] text-16px">
        <el-tabs v-model="activeName" class="demo-tab" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div>
              <el-carousel
                class="w-100%"
                height="auto"
                indicator-position="none"
              >
                <el-carousel-item class="aa" v-if="tableInfo4?.vr">
                  <div class="relative" @click="() => (showIframe = true)">
                    <img
                      class="w-100%"
                      src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
                    />
                    <img class="qj_icon" :src="getAssets('icon-qj.png')" />
                  </div>
                </el-carousel-item>
                <el-carousel-item class="aa">
                  <img
                    class="w-100%"
                    src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
                  />
                </el-carousel-item>
                <el-carousel-item class="aa">
                  <img
                    class="w-100%"
                    src="http://demo.fantere.com/3dCockpit/assets/zs.bb7f15a0.png"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="jj com">
              {{
                tableInfo4?.jj ??
                " 冯家茶园坐落于长沙市岳麓区莲花山村，地处北纬: N 251533.5”经度:E118339.8”，基地土质多为红土壤，PH值在4.5~6.0之间，土层深厚，土体松软，保水性能好，有机质含量较高，矿质营养元素丰富。"
              }}
            </div>
            <div class="text-[#F2FEFF] text-18px mb-14px">产业合作</div>
            <div class="py-15px pl-13px com">
              <div class="mb-14px">联系人:{{ tableInfo4?.lxr ?? "黄胜" }}</div>
              <div>联系电话: {{ tableInfo4?.lxdh ?? "159****2865" }}</div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="售卖产品" name="second">Config</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <div v-else class="table_info">
      <div class="center_dialog dialog_table">
        <div class="flex justify-between text-#00F9FF mb-15px">
          <span class="text-14px cursor-pointer"></span>
          <span class="text-20px">属性信息</span>
          <img
            class="w-24px h-24px"
            @click="updateShowTable"
            :src="getAssets('gb2.png')"
          />
        </div>
        <div>
          <TableList
            class="custom_table"
            :data="tableInfo1"
            :table-list="tableList"
          />
        </div>
      </div>
    </div>
    <!-- webview组件 -->
    <WebViewPage
      :to-page-url="toPageUrl"
      :show-iframe="showIframe"
      @update:show-iframe="showIframe = $event"
    />
  </div>
</template>

<script setup lang="ts">
import TableList from "./TableList/index.vue";
import { tableList, tabPanes, rowList } from "../config/tableInfo";
import getAssets from "@/utils/getAssets";

interface detailProps {
  showTable: boolean;
  tableInfo: any;
}
const props = defineProps<detailProps>();
const showTable = toRef(props, "showTable");
const tableInfo1 = ref<any>();
const tableInfo3 = ref<any>();
const tableInfo4 = ref<any>();
const showIframe = ref<boolean>(false); //是否显示iframe
const toPageUrl = ref<string>();
const activeName = ref<string>("first");
// 传参实时监听变化与赋值
watch(
  () => props.tableInfo,
  (newValue) => {
    tableInfo1.value = null;
    tableInfo3.value = null;
    tableInfo4.value = null;
    if (newValue.type == "zs") {
      // billboard点击事件
      tableInfo3.value = newValue;
      toPageUrl.value = newValue.vr;
    } else if (newValue.type == "cy") {
      tableInfo4.value = newValue;
      toPageUrl.value = newValue.vr;
    } else {
      // 面点击事件
      newValue.YDMJ = newValue.YDMJ.toFixed(2);
      tableInfo1.value = [newValue];
    }
  }
);
const handleClick = () => {
  console.log("ss");
};
const emit = defineEmits(["update:showTable"]);
const updateShowTable = () => {
  emit("update:showTable", false);
};
</script>

<style lang="less" scoped>
.table_info {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .center_dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 28px 20px;
    width: 820px;
    max-height: 308px;
  }

  .dialog_table {
    background: url("../../../assets/img/table-bg.png") no-repeat;
    background-size: 100% 100%;

    :deep(.custom_table) {
      max-height: 260px;
      overflow: hidden;
      overflow-y: auto;

      tbody tr {
        pointer-events: none;
      }

      .el-table__header .el-table__cell {
        background-color: rgba(32, 88, 130);
        color: #fff;
      }

      .el-table__row {
        background-color: rgba(40, 70, 93, 0.8);
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .dialog_jk {
    background: url("../../../assets/img/dialog-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  :deep(.form_dialog) {
    position: absolute;
    width: 500px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: #fff;

    .el-form-item__label {
      color: #fff;
    }
  }
}
.overlayMain {
  z-index: 1;
  position: absolute;
  top: 112px;
  right: 212px;
  width: 420px;
  color: #fff;
  max-height: 845px;
  box-sizing: border-box;
  background-color: #fff;
  background: url("../../../assets/img/info-bg.png") no-repeat;
  background-size: 100% 100%;

  .qj_icon {
    position: absolute;
    width: 57px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-divider {
    margin: 0;
  }
  .aa {
    height: 240px;
  }
}
:deep(.demo-tab) {
  .el-tabs__item {
    padding: 30px 30px 20px;
    color: #dae5e6;
    font-size: 16px;
    font-weight: 600;
  }
  .is-active {
    color: #78d0e0;
  }
  .el-tabs__active-bar {
    background-color: #78d0e0;
  }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  .com {
    box-sizing: border-box;
    padding: 14px 15px 28px;
    background: rgba(107, 142, 153, 0.2);
    border: 1px solid #0c454c;
    color: #e6e6e6;
    font-size: 16px;
  }
  .jj {
    margin: 14px 0;
    line-height: 26px;
    max-height: 256px;
    overflow: hidden;
    overflow-y: auto;
  }
  .jj::-webkit-scrollbar {
    width: 5px;
  }

  .jj::-webkit-scrollbar-track {
    background: rgb(179, 177, 177);
    border-radius: 10px;
  }

  .jj::-webkit-scrollbar-thumb {
    background: #5c9099;
    border-radius: 10px;
  }
}
:deep(.el-carousel) {
  .el-carousel__arrow {
    background-color: rgba(46, 74, 77, 0.7);
  }
  .el-carousel__indicators {
    display: none;
  }
  .el-icon svg {
    width: 12px;
    height: 12px;
  }
}
</style>
