<template>
  <div class="overlay_dialog">
    <!-- <div class="dialog">
      ss -->
     <slot name="overlayMain"></slot>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
// import { toRefs } from "vue";

// interface Props {
//   // title: string;
//   height: number;
//   // padding: string;
//   width: number;
//   // bgImg: string;
// }
// const props = withDefaults(defineProps<Props>(), {
//   height: 690,
//   width: 1200,
//   // bgImg:"overlay_dialog_bg.png",
// });
// const { width, height } = toRefs(props);
</script>

<style scoped>
.overlay_dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
/* 
  .dialog {
    width: v-bind(width) + "px";
    height: v-bind(height) + "px";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:url("../../assets/img/overlay_dialog_bg.png") no-repeat;
    background-size: 100% 100%;
  } */
}
</style>
