<template>
  <div class="info">
    <div class="info_title">
      <img class="w-19px h-26px ml-40px" :src="getAssets('icon_jt.png')" />
      <img class="w-88px h-31px" :src="getAssets(`text-${props.title}.png`)" />
    </div>
    <div>
      <slot name="infoMain"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import getAssets from "@/utils/getAssets";
import { toRefs } from "vue";

interface Props {
  title: string;
  height?: number;
}
const props = withDefaults(defineProps<Props>(), {
  height: 380,
  padding: "18px 14px",
});
const { height } = toRefs(props);
</script>

<style scoped>
.info {
  background: url("../../assets/img/jjxqbg.png") no-repeat;
  background-size: 100% 100%;
  width: 482px;
  height: v-bind(height) + "px";
  font-size: 20px;
  box-sizing: border-box;
  overflow: hidden;
  .info_title {
    background: url("../../assets/img/jjbg.png") no-repeat;
    background-size: 100% 100%;
    width: 480px;
    height: 50px;
    font-family: "USTitleBlack";
    display: flex;
    align-items: center;
  }
}
</style>
