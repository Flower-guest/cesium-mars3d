<!--
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-14 15:45:44
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-08-02 17:03:30
 * @FilePath: \lhs-demo\src\components\TableList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
        <el-tab-pane v-for="i in tabPanes" :key="i.name" :label="i.label" :name="i.name">
          <el-row :gutter="20">
            <template v-for="j in clickTabPane" :key="j.value">
              <el-col :span="j.value.length > 14 ? 24 : 12"
                ><div class="h-36px leading-36px">
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
import type { TabPaneName } from 'element-plus'
interface detailProps {
  tabPanes: any;
  rowList: any;
}
const props = defineProps<detailProps>();
const { tabPanes, rowList } = toRefs(props);
const clickTabPane = ref<any>(rowList.value[tabPanes.value[0].name]); //当前点击的pane展示内容
const activeName = ref(tabPanes.value[0].name);

const handleChange = (name: TabPaneName) => {
  clickTabPane.value = rowList.value[name];
};
</script>

<style lang="less" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
