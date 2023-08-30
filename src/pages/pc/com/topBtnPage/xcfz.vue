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
            <!-- 搜索 -->
            <div
              class="my-18px text-[#DAE3E6] text-16px flex justify-between items-center search"
            >
              <div v-show="!isShowSearch" class="relative">
                <div class="all" @click="isShowScreen = !isShowScreen">
                  <img
                    class="w-10px h-14px mr-10px"
                    :src="getAssets('icon_xl2.png')"
                    @click="isShowSearch = !isShowSearch"
                  />
                  全部
                </div>
                <div class="lists" v-show="isShowScreen">
                  <div v-for="i in xcfzSX" :key="i.name" @click="screening(i)">
                    {{ i.name }}
                  </div>
                </div>
              </div>
              <div
                class="flex items-center"
                :style="{ width: isShowSearch ? '100%' : '35%' }"
              >
                <img
                  class="w-24px h-24px mr-8px"
                  :src="getAssets('icon_search.png')"
                  @click="isShowSearch = !isShowSearch"
                />
                <el-input
                  v-show="isShowSearch"
                  v-model="searchVal"
                  @change="onSearch"
                  placeholder="请输入搜索关键字"
                >
                  <template #suffix>
                    <div class="w-1px h-16px bg-[#5C9099]"></div>
                    <img
                      class="w-10px h-10px mx-8px"
                      :src="getAssets('icon_ss.png')"
                    />
                    <span class="text-[#EDF4FF] text-12px cursor-pointer"
                      >搜索</span
                    >
                  </template>
                </el-input>
                <span v-show="!isShowSearch"
                  >为您找到{{ listLength }}个项目</span
                >
              </div>
            </div>
            <!-- 列表 -->
            <List :height="450" :list="zsInfoList" @show-info="showInfo" />
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

import { tj, xcfzZS, xcfzList, xcfzSX } from "./pageConst";
import getAssets from "@/utils/getAssets";
import { debounce } from "@/utils/throttle";

const dialog = ref<boolean>(true);
const zxActive = ref<any>(xcfzZS[0].val); //乡村资讯tab点击

const isShowSearch = ref<boolean>(false);
const isShowScreen = ref<boolean>(false);
const searchVal = ref<any>("");
const zsInfoList = ref<any>(xcfzList[xcfzZS[0].val]);
const listLength = computed(() => {
  return zsInfoList.value.length || 0;
});
// 招商信息tab点击
const infoClick = (i) => {
  zxActive.value = i.val;
  zsInfoList.value = xcfzList[i.val];
};

// 条件筛选下拉点击事件
const screening = (i) => {
  console.log(i);
};

const emit = defineEmits(["showInfo"]);
const showInfo = (i) => {
  emit("showInfo", i);
};

// 搜索事件
const onSearch = debounce((value: string | number) => {
  isShowSearch.value = !isShowSearch.value;
  console.log(value);
});

onMounted(() => {});
</script>

<style lang="less" scoped>
:deep(.el-input) {
  width: 100%;
  height: 28px;

  .el-input__wrapper {
    background: #0d2124;
    box-shadow: inset 0px 0px 5px -1px #92efff;
    border-radius: 8px;
    padding-left: 20px;

    .el-input__inner {
      color: #7ac0cc;
    }

    .el-input__inner::placeholder {
      color: #7ac0cc;
    }
  }
}
.all {
  width: 88px;
  box-sizing: border-box;
  height: 28px;
  line-height: 28px;
  padding-left: 7px;
  cursor: pointer;
  background: url("../../../assets/img/sxtj-bg.png") no-repeat;
  background-size: 100% 100%;
}
.lists {
  position: absolute;
  z-index: 1;
  div {
    width: 88px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: url("../../../assets/img/info-bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    cursor: pointer;
  }
  div:hover::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 28px;
    z-index: 1;
    background: url(../../../assets/img/table-bg.png) no-repeat left center/100%
      auto;
  }
}
</style>
