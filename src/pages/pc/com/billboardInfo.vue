<template>
  <div v-show="showBillboard">
    {{ !popupInfo?.name }}
    <!-- 监控弹窗 -->
    <div class="overlay" v-if="popupInfo?.type == 'spjk'">
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
          <!-- <videoPlay v-bind="options" /> -->
          <video
            class="w-370px h-155px"
            preload="auto"
            controls
            :src="popupInfo?.videoUrl ?? 'http://demo.fantere.com/3dCockpit/assets/test.2a8a8f3c.mp4'"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import "vue3-video-play/dist/style.css";
// import { videoPlay } from "vue3-video-play";
import getAssets from "@/utils/getAssets";
interface detailProps {
  showBillboard: boolean;
  popupInfo: any;
}
const props = defineProps<detailProps>();
const showBillboard = toRef(props, "showBillboard");
const popupInfo = ref<any>();
const formatted = useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss");
// https://proxy.fantere.com/qs/gethls14_14_2_0_1.m3u8?uuid=d0c16207
// const options = reactive<any>({
//   width: "370px", //播放器宽度
//   height: "155px", //播放器高度
//   color: "#409eff", //主题色
//   title: "", //视频名称
//   src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
//   muted: false, //静音
//   webFullScreen: false,
//   speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
//   autoPlay: false, //自动播放
//   loop: false, //循环播放
//   mirror: false, //镜像画面
//   ligthOff: false, //关灯模式
//   volume: 0.3, //默认音量大小
//   control: true, //是否显示控制
//   controlBtns: [
//     "audioTrack",
//     "quality",
//     "speedRate",
//     "volume",
//     "setting",
//     "pip",
//     "pageFullScreen",
//     "fullScreen",
//   ], //显示所有按钮,
// });

// 监听弹窗位置
watch(
  () => props.popupInfo,
  (newVal) => {
    popupInfo.value = newVal;
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
  background: url("../../../assets/img/dialog-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 11px 25px 13px;
}
</style>
