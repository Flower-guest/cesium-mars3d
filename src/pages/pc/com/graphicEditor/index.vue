<!--
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-08-11 09:05:37
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-11 20:37:47
 * @FilePath: \lhs-mars3d\src\pages\com\graphicEditor\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <MarsDialog
    :title="'属性编辑'"
    :top="60"
    :left="10"
    :minWidth="200"
    :visible="visible"
    @update:visible="update"
  >
    <!-- <div class="top-handle-bar">
      <el-button type="primary" :icon="Document">保存</el-button>
    </div> -->
    <div class="attr-editor-main">
      <MarsStyles
        :style="style"
        :layerName="layerName"
        :customType="customType"
        :graphicType="graphicType"
        @styleChange="styleChange"
      />
    </div>
  </MarsDialog>
</template>

<script setup lang="ts">
import MarsDialog from "./marsDialog.vue";
import MarsStyles from "./marsStyle.vue";
import _ from "lodash";
import { useWidGet } from "@/store";
const store = useWidGet();
const layerName = ref("");
const customType = ref("");
const graphicType = ref("");
const style = ref(null);
const visible = ref<any>(false);
let graphic;
watch(
  () => store.currentWidget,
  (newVal) => {
    visible.value = newVal ? true : false;
    upDataLayer(newVal);
  }
);
// 监听到矢量数据发生变化
const upDataLayer = (newVal) => {
  if (!newVal) return;
  graphic = newVal;
  layerName.value = newVal._layer.name || "";
  graphicType.value = newVal.type;
  customType.value = newVal.options.styleType;
  style.value = _.cloneDeep(newVal.style);
};

const update = (val) => {
  visible.value = val;
  graphic.stopEditing();
  store.setCurrentWidget("");
}

const styleChange = (style: any) => {
  style = toRaw(style);
  console.log("修改了style样式", style);
  graphic.setStyle(style);
};
</script>

<style lang="less" scoped>
.top-handle-bar {
  border-bottom: 1px solid #cde1de;
  padding: 5px 0 2px 0;
  :deep(.mars-icon) {
    cursor: pointer;
  }
}
.attr-editor-main {
  height: calc(100% - 40px);
  overflow-y: auto;
  :deep(*) {
    font-size: 12px;
  }
}
.attr-editor-main::-webkit-scrollbar-button {
  height: 0;
  width: 0;
  display: none;
}

.attr-editor-main::-webkit-scrollbar-track {
  background: #173147;
}

.attr-editor-main::-webkit-scrollbar-track,
.attr-editor-main::-webkit-scrollbar-thumb {
  border: 0;
}

.attr-editor-main::-webkit-scrollbar {
  height: 10px;
  width: 12px;
  background: #c5c5c5;
  border-radius: 4px;
}

.attr-editor-main::-webkit-scrollbar-thumb {
  padding-top: 100px;
  background-color: #c5c5c5;
  height: 10px;
  border-radius: 4px;
  background-clip: padding-box;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border: 0;
}
</style>
