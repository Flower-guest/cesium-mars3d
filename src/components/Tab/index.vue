<!--
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-14 15:45:44
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-21 10:51:40
 * @FilePath: \lhs-demo\src\components\TableList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane
        v-for="i in tabPanes"
        :key="i.name"
        :label="i.label"
        :name="i.name"
      >
        <el-row :gutter="20" class="row">
          <template v-for="j in clickTabPane" :key="j.value">
            <el-col :span="j.value.length > 14 ? 24 : 12"
              ><div class="h-36px leading-36px text-[#E6E6E6] text-14px">
                {{ j.label }}：{{ j.value }}
              </div></el-col
            >
          </template>
        </el-row></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName } from "element-plus";
interface detailProps {
  tabPanes: any;
  rowList: any;
  contentColor?: string;
  activeColor?: string;
  activeLineColor?: string;
}

const props = withDefaults(defineProps<detailProps>(), {
  contentColor: "#DAE5E6",
  activeColor: "#78D0E0",
  activeLineColor: "#78D0E0",
});
const { tabPanes, rowList } = toRefs(props);
const clickTabPane = ref<any>(rowList.value[tabPanes.value[0].name]); //当前点击的pane展示内容
const activeName = ref(tabPanes.value[0].name);

const handleChange = (name: TabPaneName) => {
  clickTabPane.value = rowList.value[name];
};
</script>

<style lang="less" scoped>
:deep(.demo-tabs) {
  .el-tabs__item {
    padding: 32px;
    color: v-bind(contentColor);
    font-size: 18px;
    font-weight: 600;
  }
  .is-active {
    color: v-bind(activeColor);
  }
  .el-tabs__active-bar {
    background-color: v-bind(activeLineColor);
  }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  .row {
    height: 400px;
    overflow: hidden;
    overflow-y: auto;
    margin-left: 0; 
    margin-right: 0;
  }

  .row::-webkit-scrollbar {
    width: 5px;
  }

  .row::-webkit-scrollbar-track {
    background: rgb(179, 177, 177);
    border-radius: 10px;
  }

  .row::-webkit-scrollbar-thumb {
    background: #5c9099;
    border-radius: 10px;
  }
}
</style>
