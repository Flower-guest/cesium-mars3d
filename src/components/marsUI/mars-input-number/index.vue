<template>
  <el-input-number
    class="mars-input-number"
    v-bind="attrs"
    :precision="attrs.tofixed"
  >
    <!-- <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template> -->
  </el-input-number>
</template>
<script lang="ts">
import { useAttrs, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "MarsInputNumber",
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs();

    const slots = useSlots();
    console.log(attrs);
    // 在style.js中配置toFixed用于控制保留小数位数
    return {
      slots,
      attrs,
    };
  },
});
</script>
<style lang="less" scoped>
.mars-input-number {
  color: #ffffff;
  background-color: transparent !important;
  border-color: #b9b9b9;
  width: 100%;
  * {
    color: #ffffff;
  }
}
:deep(.el-input__wrapper) {
  background: none;
  .el-input__inner {
    color: #ffffff;
  }
}
</style>
