<template>
  <div>
    <div class="info_title">
      <span class="ml-100px text-20px">{{ props.title }}</span>
    </div>
    <div class="info_main mt-5px">
      <slot name="infoMain"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  title: string;
  height?: number;
  padding?: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: 380,
  padding: '18px 14px'
})
const { height, padding } = toRefs(props);
</script>

<style scoped>
.info_title {
  background: url("../../assets/img/jjbg.png") no-repeat;
  background-size: 100% 100%;
  width: 400px;
  height: 42px;
  line-height: 30px;
}
.info_main {
  background: url("../../assets/img/jjxqbg.png") no-repeat;
  background-size: 100% 100%;
  width: 400px;
  height: v-bind(height) + "px";
  font-size: 20px;
  padding: v-bind(padding);
  box-sizing: border-box;
}
</style>
