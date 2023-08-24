<!--
 * @Author: cxj 1481240653@qq.com
 * @Date: 2023-07-14 15:45:44
 * @LastEditors: cxj 1481240653@qq.com
 * @LastEditTime: 2023-07-14 16:14:42
 * @FilePath: \lhs-demo\src\components\TableList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%; --el-table-border-color: none"
      :max-height="height"
    >
      <template v-for="i in tableList" :key="i.property">
        <el-table-column
          v-if="i.property == 'index'"
          header-align="center"
          align="center"
          type="index"
          :label="i.label"
        />
        <el-table-column
          v-else
          header-align="center"
          align="center"
          :width="i.width || 'auto'"
          :property="i.property"
          :label="i.label"
        />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface detailProps {
  data: any;
  tableList: any;
  height?: number;
}
const props = defineProps<detailProps>();
const { data, tableList, height } = toRefs(props);
</script>

<style lang="less" scoped></style>
