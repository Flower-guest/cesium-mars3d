<template>
  <div class="left flex">
    <div v-show="dialog">
      <InfoDialog :title="'xcjj'">
        <template #infoMain>
          <div class="info_main">
            <!-- 轮播图 -->
            <el-carousel height="202px" :interval="3000">
              <el-carousel-item v-for="item in xcjjImgList" :key="item">
                <img
                  @click="(showOverlayDialog = true), (showType = 'img')"
                  class="w-100% h-100%"
                  :src="getAssets(item)"
                />
              </el-carousel-item>
            </el-carousel>
            <!-- 滚动文字 -->
            <div class="jjxq_text mt-12px">
              <div
                @click="(showOverlayDialog = true), (showType = 'text')"
                class="scroll_text"
              >
                {{ xcjjScrollText }}
              </div>
            </div>
            <!-- 乡村统计 -->
            <div class="mt-27px">
              <div class="main-title">
                <span>乡村统计</span>
              </div>
              <div class="px-18px grid grid-cols-2">
                <template v-for="i in tj.xcjj" :key="i.val">
                  <div class="mt-22px flex">
                    <img
                      class="w-51px h-50px mr-15px"
                      :src="getAssets(i.imgUrl)"
                    />
                    <div class="grid grid-rows-2">
                      <div class="text-36px">
                        {{ i.val }}<span class="text-16px">{{ i.unit }}</span>
                      </div>
                      <span class="text-[#2FC6DC] text-16px">{{
                        i.label
                      }}</span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- 乡村资讯 -->
            <div class="mt-20px">
              <div class="main-title flex justify-between">
                <span>乡村资讯</span>
                <div class="flex">
                  <template v-for="i in xcjjZX" :key="i.val">
                    <div
                      class="cursor-pointer mr-20px text-14px"
                      @click="infoClick(i)"
                    >
                      <div :class="{ activeItem: zxActive.val == i.val }">
                        {{ i.label }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div style="height: 155px; width: max-content">
                <Vue3Marquee :vertical="true" :pause-on-hover="true">
                  <div
                    class="text-20px mb-12px cursor-pointer"
                    v-for="i in xcjjLB"
                    :key="i"
                    @click="(showOverlayDialog = true), (showType = 'text')"
                  >
                    {{ i }}
                  </div>
                </Vue3Marquee>
              </div>
            </div>
          </div>
        </template>
      </InfoDialog>
    </div>
    <img
      class="w-51px h-101px"
      :class="{ jump: !dialog }"
      @click="dialog = !dialog"
      :src="getAssets(dialog ? 'sq.png' : 'zk.png')"
    />
  </div>
  <OverlayDialog v-show="showOverlayDialog">
    <template #overlayMain>
      <div class="overlayMain">
        <div class="text-[#58E7FF] text-28px ml-170px mt-[-10px]">{{zxActive.label}}</div>
        <img
          @click="showOverlayDialog = false"
          class="float-right mt-30px mr-49px w-48px h-48px"
          :src="getAssets('gb4.png')"
        />
        <div v-if="showType == 'img'">
          <el-carousel class="mt-8% ml-8% w-80%" height="auto" :interval="3000">
            <el-carousel-item
              v-for="item in xcjjImgList"
              :key="item"
              class="aa"
            >
              <img
                @click="(showOverlayDialog = true), (showType = 'img')"
                class="w-100% h-100%"
                :src="getAssets(item)"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-else>
          <div class="mt-77px text-36px text-center">XXXX乡村简介</div>
          <div class="mt-32px px-49px text-24px leading-1">
            {{ xcjjOverlayMainText }}
          </div>
        </div>
      </div>
    </template>
  </OverlayDialog>
</template>

<script lang="ts" setup>
import "./com.less";
import {
  xcjjScrollText,
  xcjjOverlayMainText,
  xcjjImgList,
  tj,
  xcjjZX,
  xcjjLB,
} from "./pageConst";
import getAssets from "@/utils/getAssets";
const dialog = ref<boolean>(true); //可视化面板是否显示
const showOverlayDialog = ref<boolean>(false); //是否显示弹窗
const showType = ref<any>(); //弹窗显示类型
const zxActive = ref<any>(xcjjZX[0]); //乡村资讯tab点击

const infoClick = (i) => {
  zxActive.value = i;
};
</script>

<style lang="less" scoped>
.left {
  .info_main {
    :deep(.el-carousel) {
      .el-carousel__arrow {
        background-color: rgba(46, 74, 77, 0.7);
      }
      .el-carousel__indicators {
        display: none;
      }
      .el-icon svg{
        width: 12px;
        height: 12px;
      }
    }
    .jjxq_text {
      height: 124px;
      text-indent: 2em;
      overflow: hidden;
      .scroll_text {
        font-size: 20px;
        line-height: 30px;
        animation: scroll-text 15s linear infinite;
      }

      @keyframes scroll-text {
        0% {
          transform: translateY(2%);
        }

        100% {
          transform: translateY(-70%);
        }
      }
    }
  }
}

.overlayMain {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/img/overlay_dialog_bg.png") no-repeat;
  background-size: 100% 100%;
  width: 1200px;
  height: 690px;
  color: #fff;
  text-indent: 2em;
  .aa {
    height: 490px;
  }
}

.left::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
