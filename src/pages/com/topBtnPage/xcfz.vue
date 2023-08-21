<template>
  <div class="left flex">
    <div v-show="dialog">
      <InfoDialog :title="'xcfz'">
        <template #infoMain>
          <div class="info_main">
            <div class="main-title">
              <span>数据统计</span>
            </div>
            <div class="px-24px grid grid-cols-2">
              <template v-for="i in tj.xcfz" :key="i.val">
                <div class="mt-22px mr-8px flex">
                  <img
                    class="w-51px h-50px mr-15px"
                    :src="getAssets(i.imgUrl)"
                  />
                  <div class="grid grid-rows-2">
                    <div class="text-36px">
                      {{ i.val }}<span class="text-16px">{{ i.unit }}</span>
                    </div>
                    <span class="text-[#2FC6DC] text-16px">{{ i.label }}</span>
                  </div>
                </div>
              </template>
            </div>
            <!-- 招商信息 -->
            <div class="mt-20px">
              <div class="main-title flex justify-between">
                <span>招商信息</span>
                <div class="flex">
                  <template v-for="i in xcfzZS" :key="i.val">
                    <div
                      class="cursor-pointer ml-23px text-14px"
                      @click="infoClick(i)"
                    >
                      <div :class="{ activeItem: zxActive == i.val }">
                        {{ i.label }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <List :list="xcfzList" />
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
</template>

<script lang="ts" setup>
import "./com.less";
import List from "./list.vue";
import { tj, xcfzZS, xcfzList } from "./pageConst";
import getAssets from "@/utils/getAssets";

const dialog = ref<boolean>(true);
const zxActive = ref<any>("zhxm"); //乡村资讯tab点击

const infoClick = (i) => {
  zxActive.value = i.val;
};

onMounted(() => {});
</script>

<style lang="less" scoped></style>
