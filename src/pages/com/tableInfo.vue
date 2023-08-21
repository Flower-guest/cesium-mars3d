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
        <div class="text-23px">信息面板</div>
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
            <el-carousel-item class="aa">
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
    <div v-else class="table_info">
      <!-- 招商表单 -->
      <div v-if="tableInfo3">
        <OverlayDialog v-if="tableInfo3.gltype == 'edit'">
          <template #overlayMain>
            <!-- 编辑页面 -->
            <div class="form_dialog">
              <EditInfo />
              <div class="flex justify-center my-10px">
                <el-button type="primary" @click="updateShowTable"
                  >保存</el-button
                >
                <el-button @click="updateShowTable">取消</el-button>
              </div>
            </div>
          </template>
        </OverlayDialog>
      </div>

      <!-- 建筑物弹窗 -->
      <div v-else class="center_dialog dialog_table">
        <div class="flex justify-between text-#00F9FF mb-15px">
          <span class="text-14px cursor-pointer"></span>
          <span class="text-20px">属性信息</span>
          <img
            class="w-24px h-24px"
            @click="updateShowTable"
            :src="getAssets('gb2.png')"
          />
        </div>
        <div v-if="tableInfo2">
          <TableList
            class="custom_table"
            :data="tableInfo2"
            :table-list="tableList2"
          />
        </div>
        <div v-else>
          <TableList
            class="custom_table"
            :data="tableInfo1"
            :table-list="tableList"
          />
        </div>
      </div>

      <!-- webview组件 -->
      <WebViewPage
        :to-page-url="toPageUrl"
        :show-iframe="showIframe"
        @update:show-iframe="showIframe = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EditInfo from "./editInfo/index.vue";
import TableList from "./TableList/index.vue";
import { tableList, tableList2, tabPanes, rowList } from "../config/tableInfo";
import getAssets from "@/utils/getAssets";

interface detailProps {
  showTable: boolean;
  tableInfo: any;
}
const props = defineProps<detailProps>();
const showTable = toRef(props, "showTable");
const tableInfo1 = ref<any>();
const tableInfo2 = ref<any>();
const tableInfo3 = ref<any>({ gltype: "add" });
const showIframe = ref<boolean>(false); //是否显示iframe
const toPageUrl = ref<string>();
// 传参实时监听变化与赋值
watch(
  () => props.tableInfo,
  (newValue) => {
    if (newValue.type == "lhs" || newValue.type == "xz") {
      // billboard点击事件
      tableInfo3.value = newValue;
      toPageUrl.value =
        "https://www.jgqxw.com/index/tour/show/vid/7be6c8829610652b";
    } else {
      // 面点击事件
      if (newValue?.AREA) {
        newValue.AREA = newValue.AREA.toFixed(2);
        newValue.TOTALAREA = newValue.TOTALAREA.toFixed(2);
        tableInfo2.value = [newValue];
      } else {
        newValue.YDMJ = newValue.YDMJ.toFixed(2);
        tableInfo1.value = [newValue];
      }
    }
  }
);
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
    background: url("../../assets/img/table-bg.png") no-repeat;
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
    background: url("../../assets/img/dialog-bg.png") no-repeat;
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
  position: absolute;
  top: 112px;
  right: 212px;
  width: 420px;
  color: #fff;
  max-height: 845px;
  box-sizing: border-box;
  background-color: #fff;
  background: url("../../assets/img/info-bg.png") no-repeat;
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
</style>
