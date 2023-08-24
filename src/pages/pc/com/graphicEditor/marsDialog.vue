<template>
  <div
    class="mars-dialog"
    :class="[animationClass]"
    ref="dialogRef"
    v-show="visible"
  >
    <div class="flex justify-between items-center">
      <span class="text-[20px] text-[#fff]">{{ props.title }}</span>
      <img class="w-20px" :src="getAssets('gb3.png')" @click="updateVisible" />
    </div>

    <div class="mars-dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import getAssets from "@/utils/getAssets";
interface Props {
  title?: string; // 弹框标题
  visible?: boolean; // 是否显示
  animation?: string | boolean; // 是否开启开场动画，或开场动画的class名
  width?: number | string; // 初始宽度
  height?: number | string; // 初始高度
  left?: number | string; // 定位 left值
  right?: number | string; // 定位right值
  top?: number | string; // 定位top值
  bottom?: number | string; // 定位bottom值
  minWidth?: number; // 最小宽度
  minHeight?: number; // 最小高度
  maxWidth?: number; // 最大宽度
  maxHeight?: number; // 最大高度
  zIndex?: number; // 层级
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  closeable: false,
  closeButton: true,
  animation: true,
  minWidth: 100,
  minHeight: 100,
  maxWidth: 100000,
  maxHeight: 1000,
  zIndex: 900,
});
const dialogRef = ref<any>();

const animationClass = computed(() => {
  if (props.animation === true) {
    const right = props.right;
    if (right && right >= 0 && right < 100) {
      return "fadein-right";
    }
    const left = props.left || 0;
    if (left || (left >= 0 && left < 100)) {
      return "fadein-left";
    }
    const top = props.top || 0;
    if (left || (top >= 0 && top < 100)) {
      return "fadein-down";
    }
    const bottom = props.bottom || 0;
    if (bottom || (bottom >= 0 && bottom < 100)) {
      return "fadein-up";
    }
    return "fadein-center";
  } else if (typeof props.animation === "string") {
    return props.animation;
  } else {
    return "";
  }
});

const emit = defineEmits(["update:visible"]);
const updateVisible = () => {
  emit("update:visible", false);
};
</script>

<style lang="less" scoped>
.mars-dialog {
  position: absolute;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  z-index: 999 !important;
  border-bottom: 1px solid #008aff70;
  border-left: 1px solid #008aff70;
  border-right: 1px solid #008aff70;
  z-index: 100;
  background-color: rgba(23, 49, 71, 0.8);
  left: 150px;
  top: 100px;
  height: 800px;

  .mars-dialog__header {
    height: 44px;
    width: 100%;
    line-height: 44px;
    overflow: hidden;
    padding: 0 5px 0px 10px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    .icon {
      margin-right: 5px;
      color: #ffffff;
    }
    .title {
      font-size: 16px;
    }
    .close-btn {
      float: right;
      cursor: pointer;
      margin-top: 12px;
      color: #ffffff;
    }
  }

  .close-btn__flot {
    position: absolute;
    right: -8px;
    top: -8px;
    cursor: pointer;
  }

  .mars-dialog__content {
    height: 100%;
    overflow: auto;
    padding: 5px;
  }

  .mars-dialog__footer {
    height: 44px;
    width: 100%;
    color: #ffffff;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
  }

  .mars-dialog__handle {
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    width: 10px;
    height: 10px;
    opacity: 0;
  }
  .handle-t {
    width: auto;
    top: 0;
    left: 10px;
    right: 10px;
    cursor: row-resize;
  }
  .handle-b {
    width: auto;
    bottom: 0;
    left: 10px;
    right: 10px;
    cursor: row-resize;
  }
  .handle-l {
    height: auto;
    top: 10px;
    left: 0;
    bottom: 10px;
    cursor: col-resize;
  }
  .handle-r {
    height: auto;
    top: 10px;
    right: 0;
    bottom: 10px;
    cursor: col-resize;
  }
  .handle-rb {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }
  .handle-lb {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
  }
}

/**下面是 5个 动画 */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.fadein-right {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.fadein-left {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadein-up {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
.fadein-down {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

@keyframes fadeInCenter {
  from {
    opacity: 0;
    transform: scale(0.1);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.fadein-center {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInCenter;
  animation-name: fadeInCenter;
}
</style>
