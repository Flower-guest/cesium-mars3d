<template>
  <div v-show="showBillboard">
    {{ !popupInfo?.name }}
    <!-- 信息弹窗 -->
    <div
      v-show="popupInfo?.type !== 'jkdw'"
      ref="infoDialog"
      class="info_dialog py-10px text-16px"
      :style="{
        left: bPosition.x + 'px',
        top: bPosition.y + 'px',
      }"
    >
      <el-divider />
      <div class="flex justify-between items-center mt-10px px-6px">
        <img class="w-21px h-21px" :src="getAssets('info-dialog-icon.png')" />
        <el-text truncated>{{ popupInfo?.name }}</el-text>
        <img
          class="w-14px h-14px"
          @click="updateShowBillboard"
          :src="getAssets('gb3.png')"
        />
      </div>
      <div class="my-25px px-6px">
        <template v-if="popupInfo?.img">
          <div @click="() => (showIframe = true)" class="relative">
            <img class="w-100%" :src="popupInfo?.img" />
            <img class="qj_icon" :src="getAssets('icon-qj.png')" />
          </div>
        </template>
        <template v-else>
          <video
            class="w-100%"
            preload="auto"
            controls
            :src="popupInfo?.video"
          ></video>
        </template>
      </div>
      <div class="px-6px leading-0.5 indent-0.5 text-12px">
        {{ popupInfo?.jj }}
      </div>
    </div>
    <!-- 监控弹窗 -->
    <div class="overlay" v-if="popupInfo?.type == 'jkdw'">
      <div class="jk_dialog">
        <div class="flex justify-between">
          <div class="flex items-center text-#00FFFF text-14px mr-79px pt-11px">
            <img
              class="mr-13px w-13px h-15px"
              :src="getAssets('jc-icon.png')"
            />监控视频
          </div>
          <div class="flex items-center text-#04BCC2 text-12px pt-11px">
            {{ formatted }}
            <img
              class="ml-23px w-24px h-24px"
              @click="updateShowBillboard"
              :src="getAssets('gb1.png')"
            />
          </div>
        </div>
        <div class="w-100% h-1px bg-#00F9FF mt-9px mb-10px"></div>
        <div>
          <video
            class="w-370px h-155px"
            preload="auto"
            controls
            :src="popupInfo?.videoUrl"
          ></video>
        </div>
      </div>
    </div>
    <!-- webview组件 -->
    <WebViewPage
      :to-page-url="popupInfo?.qj ?? 's'"
      :show-iframe="showIframe"
      @update:show-iframe="showIframe = $event"
    />
  </div>
</template>

<script setup lang="ts">
import getAssets from "@/utils/getAssets";
interface detailProps {
  showBillboard: boolean;
  popupInfo: any;
  bPosition: any;
}
const props = defineProps<detailProps>();
const showBillboard = toRef(props, "showBillboard");
const popupInfo = ref<any>();
const bPosition = ref<any>(props.bPosition);
const infoDialog = ref<any>();
const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss");
const showIframe = ref<boolean>(false); //是否显示iframe

// 监听弹窗位置
watch(
  () => [props.popupInfo, props.bPosition],
  (newVal) => {
    popupInfo.value = newVal[0];

    // 修改弹窗位置 排除监控与信息录入
    if (newVal[0].type !== "jk") {
      const x = newVal[1].x + infoDialog.value.offsetWidth / 10;
      const y = newVal[1].y - infoDialog.value.offsetHeight / 10;
      bPosition.value = { x, y };
    }
  }
);

// 关闭弹窗事件
const emit = defineEmits(["update:showBillboard"]);
const updateShowBillboard = () => {
  emit("update:showBillboard", false);
};
</script>

<style lang="less" scoped>
.info_dialog {
  position: absolute;
  width: 280px;
  color: #fff;
  background-color: rgba(26, 31, 31, 0.86);

  .el-divider {
    margin: 0;
  }

  .el-text {
    color: #fff;
    margin: 0 4px;
    font-size: 16px;
  }

  .qj_icon {
    position: absolute;
    width: 38px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.jk_dialog {
  position: absolute;
  width: 380px;
  height: 220px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: url("../../assets/img/dialog-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 11px 25px 13px;
}
</style>
