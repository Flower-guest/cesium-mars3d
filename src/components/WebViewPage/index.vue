<template>
  <div class="iframe z-3333" v-show="showIframe">
    <iframe class="inlineFrameExample w-100% h-100%" :src="toPageUrl">
    </iframe>
    <div class="i-img">
      <img @click="updateShowIframe" :src="getAssets('gb2.png')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import getAssets from "@/utils/getAssets"
interface detailProps {
  showIframe: boolean;
  toPageUrl: string;
}
const props = defineProps<detailProps>();
const showIframe = toRef(props, 'showIframe');
const toPageUrl = ref<any>();
watch(
  () => props.toPageUrl,
  (newValue) => {
    toPageUrl.value = newValue;
    console.log(toPageUrl.value);
  }
)
const emit = defineEmits(["update:showIframe"]);
const updateShowIframe = () => {
  emit('update:showIframe', false);
}

</script>

<style lang="less" scoped>
.iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  .i-img {
    position: absolute;
    transform: translate(-50%, -60%);
    left: 50%;
    top: 0%;
    transition: all 0.3s ease-in;
  }

  .i-img:hover {
    transform: translate(-50%, 0%);
    top: 10px;
  }
}
</style>
